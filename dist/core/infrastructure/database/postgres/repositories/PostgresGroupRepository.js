"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresGroupRepository = void 0;
const Group_1 = require("../../../../domain/entities/Group");
const database_1 = __importDefault(
  require("../../../../../shared/config/database"),
);
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
    const result = await database_1.default.query(query, values);
    return this.mapToEntity(result.rows[0]);
  }
  async delete(id) {
    const query = "DELETE FROM groups WHERE id = $1";
    const result = await database_1.default.query(query, [id]);
    return (result.rowCount ?? 0) > 0;
  }
  async findById(id) {
    const query = "SELECT * FROM groups WHERE id = $1";
    const result = await database_1.default.query(query, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return this.mapToEntity(result.rows[0]);
  }
  async findByName(name) {
    const query = "SELECT * FROM groups WHERE name = $1";
    const result = await database_1.default.query(query, [name]);
    if (result.rows.length === 0) {
      return null;
    }
    return this.mapToEntity(result.rows[0]);
  }
  async findAll(pagination) {
    const offset = (pagination.page - 1) * pagination.limit;
    // Get total count
    const countQuery = "SELECT COUNT(*) FROM groups";
    const countResult = await database_1.default.query(countQuery);
    const total = parseInt(countResult.rows[0].count);
    // Get paginated data
    const query = `
      SELECT * FROM groups 
      ORDER BY created_at DESC 
      LIMIT $1 OFFSET $2
    `;
    const result = await database_1.default.query(query, [
      pagination.limit,
      offset,
    ]);
    const groups = result.rows.map((row) => this.mapToEntity(row));
    return {
      data: groups,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages: Math.ceil(total / pagination.limit),
      },
    };
  }
  async update(id, groupData) {
    const updates = [];
    const values = [];
    let paramCount = 0;
    if (groupData.name !== undefined) {
      paramCount++;
      updates.push(`name = $${paramCount}`);
      values.push(groupData.name);
    }
    if (groupData.description !== undefined) {
      paramCount++;
      updates.push(`description = $${paramCount}`);
      values.push(groupData.description);
    }
    if (groupData.participantsCount !== undefined) {
      paramCount++;
      updates.push(`participants_count = $${paramCount}`);
      values.push(groupData.participantsCount);
    }
    if (groupData.isActive !== undefined) {
      paramCount++;
      updates.push(`is_active = $${paramCount}`);
      values.push(groupData.isActive);
    }
    if (groupData.isFull !== undefined) {
      paramCount++;
      updates.push(`is_full = $${paramCount}`);
      values.push(groupData.isFull);
    }
    paramCount++;
    updates.push(`updated_at = $${paramCount}`);
    values.push(new Date());
    paramCount++;
    values.push(id);
    const query = `
      UPDATE groups 
      SET ${updates.join(", ")} 
      WHERE id = $${paramCount} 
      RETURNING *
    `;
    const result = await database_1.default.query(query, values);
    if (result.rows.length === 0) {
      throw new Error("Group not found");
    }
    return this.mapToEntity(result.rows[0]);
  }
  mapToEntity(row) {
    // Verificar se todos os campos obrigatórios existem
    if (!row.name) {
      console.error("❌ Missing name in database row:", row);
      throw new Error("Database row missing required name field");
    }
    if (!row.created_by) {
      console.error("❌ Missing created_by in database row:", row);
      throw new Error("Database row missing required created_by field");
    }
    return new Group_1.Group({
      id: row.id,
      name: row.name,
      description: row.description,
      createdBy: row.created_by,
      participantsCount: row.participants_count,
      whatsappGroupInviteLink: row.whatsapp_group_invite_link,
      whatsappGroupId: row.whatsapp_group_id,
      isActive: row.is_active,
      isFull: row.is_full,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }
}
exports.PostgresGroupRepository = PostgresGroupRepository;
//# sourceMappingURL=PostgresGroupRepository.js.map
