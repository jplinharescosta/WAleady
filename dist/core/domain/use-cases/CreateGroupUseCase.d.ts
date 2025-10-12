import { Group } from "../entities/Group";
import { CreateGroupRequest } from "../../../types";
import { IGroupRepository } from "../repositories/interfaces";
export declare class CreateGroupUseCase {
    private groupRepository;
    constructor(groupRepository: IGroupRepository);
    execute({ name, description, createdBy }: CreateGroupRequest): Promise<Group>;
}
