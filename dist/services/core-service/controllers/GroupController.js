"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupController = void 0;
class GroupController {
    constructor(createGroupUseCase, deleteGroupUseCase, groupRepository) {
        this.createGroupUseCase = createGroupUseCase;
        this.deleteGroupUseCase = deleteGroupUseCase;
        this.groupRepository = groupRepository;
    }
    async createGroup(req, res) {
        try {
            const { name, description, createdBy } = req.body;
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
        }
        catch (error) {
            console.error("Error creating group:", error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(400).json({
                success: false,
                message: errorMessage,
            });
        }
    }
    async deleteGroup(req, res) {
        try {
            const { id } = req.params;
            const result = await this.deleteGroupUseCase.execute(id);
            res.status(200).json({
                success: true,
                message: result.message,
            });
        }
        catch (error) {
            console.error("Error deleting group:", error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(500).json({
                success: false,
                message: errorMessage,
            });
        }
    }
    async getGroups(req, res) {
        try {
            const { isActive, createdBy } = req.query;
            const { page = 1, limit = 10 } = req.pagination || { page: 1, limit: 10 };
            const pagination = {
                page: Number(page),
                limit: Number(limit)
            };
            const result = await this.groupRepository.findAll(pagination);
            res.status(200).json({
                success: true,
                data: result.data.map((group) => group.toJSON()),
                pagination: result.pagination,
            });
        }
        catch (error) {
            console.error("Error fetching groups:", error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(500).json({
                success: false,
                message: errorMessage,
            });
        }
    }
    async getGroupById(req, res) {
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
        }
        catch (error) {
            console.error("Error fetching group:", error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(500).json({
                success: false,
                message: errorMessage,
            });
        }
    }
}
exports.GroupController = GroupController;
//# sourceMappingURL=GroupController.js.map