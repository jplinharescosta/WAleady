import { Request, Response } from 'express';
import { CreateGroupUseCase } from '../../../core/domain/use-cases/CreateGroupUseCase';
import { DeleteGroupUseCase } from '../../../core/domain/use-cases/DeleteGroupUseCase';
import { IGroupRepository } from '../../../core/domain/repositories/interfaces';
import { PaginationParams } from '../../../types';
interface RequestWithPagination extends Request {
    pagination: PaginationParams;
}
export declare class GroupController {
    private createGroupUseCase;
    private deleteGroupUseCase;
    private groupRepository;
    constructor(createGroupUseCase: CreateGroupUseCase, deleteGroupUseCase: DeleteGroupUseCase, groupRepository: IGroupRepository);
    createGroup(req: Request, res: Response): Promise<void>;
    deleteGroup(req: Request, res: Response): Promise<void>;
    getGroups(req: RequestWithPagination, res: Response): Promise<void>;
    getGroupById(req: Request, res: Response): Promise<void>;
}
export {};
