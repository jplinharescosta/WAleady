import { Request, Response } from 'express';
import { CreateGroupUseCase } from '../../../core/domain/use-cases/CreateGroupUseCase';
import { DeleteGroupUseCase } from '../../../core/domain/use-cases/DeleteGroupUseCase';
import { IGroupRepository } from '../../../core/domain/repositories/interfaces';
import { CreateGroupRequest, PaginationParams } from '../../../types';

interface RequestWithPagination extends Request {
  pagination: PaginationParams;
}

export class GroupController {
  constructor(
    private createGroupUseCase: CreateGroupUseCase,
    private deleteGroupUseCase: DeleteGroupUseCase,
    private groupRepository: IGroupRepository
  ) {}

  async createGroup(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, createdBy }: CreateGroupRequest = req.body;

      // Validar dados obrigatórios
      if (!name || !createdBy) {
        res.status(400).json({
          success: false,
          message: "Name and createdBy are required",
        });
        return;
      }

      const group = await this.createGroupUseCase.execute({
        name,
        description,
        createdBy,
      });

      res.status(201).json({
        success: true,
        data: group.toJSON(),
        message: "Group created successfully",
      });
    } catch (error) {
      console.error("Error creating group:", error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }
  }

  async deleteGroup(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.deleteGroupUseCase.execute(id);

      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      console.error("Error deleting group:", error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({
        success: false,
        message: errorMessage,
      });
    }
  }

  async getGroups(req: RequestWithPagination, res: Response): Promise<void> {
    try {
      const { isActive, createdBy } = req.query;
      const { page = 1, limit = 10 } = req.pagination || { page: 1, limit: 10 };
      
      const pagination: PaginationParams = {
        page: Number(page),
        limit: Number(limit)
      };

      const result = await this.groupRepository.findAll(pagination);

      res.status(200).json({
        success: true,
        data: result.data.map((group) => group.toJSON()),
        pagination: result.pagination,
      });
    } catch (error) {
      console.error("Error fetching groups:", error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({
        success: false,
        message: errorMessage,
      });
    }
  }

  async getGroupById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const group = await this.groupRepository.findById(id);

      if (!group) {
        res.status(404).json({
          success: false,
          message: "Group not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: group.toJSON(),
      });
    } catch (error) {
      console.error("Error fetching group:", error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({
        success: false,
        message: errorMessage,
      });
    }
  }
}