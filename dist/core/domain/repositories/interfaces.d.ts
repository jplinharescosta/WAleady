import { Group } from '../entities/Group';
import { PaginationParams, PaginatedResponse } from '../../../types';
export interface IGroupRepository {
    create(group: Group): Promise<Group>;
    findById(id: string): Promise<Group | null>;
    findByName(name: string): Promise<Group | null>;
    findAll(pagination: PaginationParams): Promise<PaginatedResponse<Group>>;
    update(id: string, group: Partial<Group>): Promise<Group>;
    delete(id: string): Promise<boolean>;
}
export interface IBroadcastRepository {
    ping(): Promise<any>;
}
