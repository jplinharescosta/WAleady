import { IGroupRepository } from '../repositories/interfaces';
import { Group } from '../entities/Group';
import { UpdateGroupRequest } from '../../../types';
import {
  ValidationError,
  NotFoundError
} from '../../../shared/middlewares/errors/CustomErrors';

export class UpdateGroupUseCase {
  constructor(private groupRepository: IGroupRepository) {}

  private readonly ALLOWED_UPDATE_FIELDS = [
    'name',
    'description',
    'isActive',
    'isFull',
    'whatsappGroupInviteLink'
  ] as const; // Campos permitidos para atualização

  private normalizeUpdateData(data: Partial<UpdateGroupRequest>) {
    const normalized = { ...data };
    if (normalized.name) {
      normalized.name = normalized.name.trim();
    }
    if (normalized.description) {
      normalized.description = normalized.description.trim();
    }
    return normalized;
  }

  private filterAllowedFields(updateData: UpdateGroupRequest) {
    const filtered: Partial<UpdateGroupRequest> = {};
    this.ALLOWED_UPDATE_FIELDS.forEach((field) => {
      if (updateData[field] !== undefined) {
        filtered[field] = updateData[field] as any;
      }
    });
    return filtered;
  }

  async execute(id: string, updateData: UpdateGroupRequest): Promise<Group> {
    const allowedData = this.filterAllowedFields(updateData);
    const normalizedData = this.normalizeUpdateData(allowedData);

    // Validações
    if (!id || typeof id !== 'string') {
      throw new ValidationError('Invalid group ID', {
        field: 'id',
        issue: 'Group ID must be a non-empty string'
      });
    }
    // Validar se há dados para atualizar
    if (Object.keys(normalizedData).length === 0) {
      throw new ValidationError('No update data provided', {
        field: 'data',
        issue: 'At least one valid field must be provided for update'
      });
    }
    if (normalizedData.description && normalizedData.description.length > 300) {
      throw new ValidationError('Description is too long.', {
        field: 'description',
        issue: 'Description cannot exceed 300 characters.'
      });
    }
    if (normalizedData.name && normalizedData.name.length > 100) {
      throw new ValidationError('Name is too long.', {
        field: 'name',
        issue: 'Name cannot exceed 100 characters.'
      });
    }

    // Verificar se o grupo existe
    const group = await this.groupRepository.findById(id);
    if (!group) {
      throw new NotFoundError('Group not found', {
        field: 'id',
        issue: 'No group found with the provided ID'
      });
    }
    // Atualizar no Banco de Dados
    const updatedGroup = await this.groupRepository.update(id, normalizedData);

    return updatedGroup;
  }
}
