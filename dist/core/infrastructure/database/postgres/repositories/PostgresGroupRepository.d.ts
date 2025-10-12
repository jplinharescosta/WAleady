import { Group } from "../../../../domain/entities/Group";
import { IGroupRepository } from "../../../../domain/repositories/interfaces";
import { PaginationParams, PaginatedResponse } from "../../../../../types";
export declare class PostgresGroupRepository implements IGroupRepository {
    create(group: Group): Promise<Group>;
    delete(id: string): Promise<boolean>;
    findById(id: string): Promise<Group | null>;
    findByName(name: string): Promise<Group | null>;
    findAll(pagination: PaginationParams): Promise<PaginatedResponse<Group>>;
    update(id: string, groupData: Partial<Group>): Promise<Group>;
    private mapToEntity;
}
