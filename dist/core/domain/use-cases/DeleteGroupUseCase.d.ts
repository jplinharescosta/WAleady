import { IGroupRepository } from "../repositories/interfaces";
import { ApiResponse } from "../../../types";
export declare class DeleteGroupUseCase {
    private groupRepository;
    constructor(groupRepository: IGroupRepository);
    execute(id: string): Promise<ApiResponse<boolean>>;
}
