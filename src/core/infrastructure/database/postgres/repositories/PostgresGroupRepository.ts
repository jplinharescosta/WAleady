import { Group } from "../../../../domain/entities/Group";
import { IGroupRepository } from "../../../../domain/repositories/interfaces";
import { PaginationParams, PaginatedResponse } from "../../../../../types";
import { Pool, PoolClient } from "pg";
import pool from "../../../../../shared/config/database";

interface GroupFilters {
  isActive?: boolean;
  createdBy?: string;
  limit?: number;
  offset?: number;
}

interface GroupRow {
  id: string;
  name: string;
  description?: string;
  created_by: string;
  participants_count: number;
  whatsapp_group_invite_link?: string;
  whatsapp_group_id?: string;
  is_active: boolean;
  is_full: boolean;
  created_at: Date;
  updated_at?: Date;
}

export class PostgresGroupRepository implements IGroupRepository {
  async create(group: Group): Promise<Group> {
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
    return this.mapToEntity(result.rows[0]);
  }

  async delete(id: string): Promise<boolean> {
    const query = "DELETE FROM groups WHERE id = $1";
    const result = await pool.query(query, [id]);
    return (result.rowCount ?? 0) > 0;
  }

  async findById(id: string): Promise<Group | null> {
    const query = "SELECT * FROM groups WHERE id = $1";
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapToEntity(result.rows[0]);
  }

  async findByName(name: string): Promise<Group | null> {
    const query = "SELECT * FROM groups WHERE name = $1";
    const result = await pool.query(query, [name]);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapToEntity(result.rows[0]);
  }

  async findAll(pagination: PaginationParams): Promise<PaginatedResponse<Group>> {
    const offset = (pagination.page - 1) * pagination.limit;
    
    // Get total count
    const countQuery = "SELECT COUNT(*) FROM groups";
    const countResult = await pool.query(countQuery);
    const total = parseInt(countResult.rows[0].count);

    // Get paginated data
    const query = `
      SELECT * FROM groups 
      ORDER BY created_at DESC 
      LIMIT $1 OFFSET $2
    `;
    const result = await pool.query(query, [pagination.limit, offset]);
    
    const groups = result.rows.map((row: GroupRow) => this.mapToEntity(row));
    
    return {
      data: groups,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages: Math.ceil(total / pagination.limit)
      }
    };
  }

  async update(id: string, groupData: Partial<Group>): Promise<Group> {
    const updates: string[] = [];
    const values: any[] = [];
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
      SET ${updates.join(', ')} 
      WHERE id = $${paramCount} 
      RETURNING *
    `;

    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      throw new Error('Group not found');
    }

    return this.mapToEntity(result.rows[0]);
  }

  private mapToEntity(row: GroupRow): Group {
    // Verificar se todos os campos obrigatórios existem
    if (!row.name) {
      console.error("❌ Missing name in database row:", row);
      throw new Error("Database row missing required name field");
    }

    if (!row.created_by) {
      console.error("❌ Missing created_by in database row:", row);
      throw new Error("Database row missing required created_by field");
    }

    return new Group({
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