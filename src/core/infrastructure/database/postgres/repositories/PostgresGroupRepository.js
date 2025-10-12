const Group = require("../../../../domain/entities/Group");
const pool = require("../../../../../shared/config/database");

class PostgresGroupRepository {
  async create(group) {
    const query = `
            INSERT INTO groups (name, description, created_by, participants_count, whatsapp_group_invite_link, whatsapp_group_id, is_active, is_full)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `;

    const values = [
      group.name,
      group.description,
      group.createdBy,
      group.participantsCount,
      group.whatsappGroupInviteLink,
      group.whatsappGroupId,
      group.isActive,
      group.isFull,
    ];

    const result = await pool.query(query, values);
    return this.mapToEntity(result.rows);
  }

  async deleteById(id) {
    const query = "DELETE FROM groups WHERE id = $1";
    await pool.query(query, [id]);

    return { success: true, message: "Group deleted successfully" };
  }

  async findById(id) {
    const query = "SELECT * FROM groups WHERE id = $1";
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapToEntity(result.rows);
  }

  async findByName(name) {
    const query = "SELECT * FROM groups WHERE name = $1";
    const result = await pool.query(query, [name]);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapToEntity(result.rows);
  }

  async findAll(filters = {}) {
    let query = "SELECT * FROM groups WHERE 1=1";
    const values = [];

    let paramCount = 0;

    if (filters.isActive !== undefined) {
      paramCount++;
      query += ` AND is_active = $${paramCount}`;
      values.push(filters.isActive);
    }

    if (filters.createdBy) {
      paramCount++;
      query += ` AND created_by = $${paramCount}`;
      values.push(filters.createdBy);
    }

    query += " ORDER BY created_at DESC";

    if (filters.limit) {
      paramCount++;
      query += ` LIMIT $${paramCount}`;
      values.push(filters.limit);
    }

    if (filters.offset) {
      paramCount++;
      query += ` OFFSET $${paramCount}`;
      values.push(filters.offset);
    }

    const result = await pool.query(query, values);
    return result.rows.map((row) => this.mapToEntity(row));
  }

  mapToEntity(row) {
    const data = Array.isArray(row) ? row[0] : row;

    // Verificar se todos os campos obrigatórios existem
    if (!data.name) {
      console.error("❌ Missing name in database row:", data);
      throw new Error("Database row missing required name field");
    }

    if (!data.created_by) {
      console.error("❌ Missing created_by in database row:", data);
      throw new Error("Database row missing required created_by field");
    }
    return new Group({
      id: data.id,
      name: data.name,
      description: data.description,
      createdBy: data.created_by,
      participantsCount: data.participants_count,
      whatsappGroupInviteLink: data.whatsapp_group_invite_link,
      whatsappGroupId: data.whatsapp_group_id,
      isActive: data.is_active,
      isFull: data.is_full,
      createdAt: data.created_at,
    });
  }
}

module.exports = PostgresGroupRepository;
