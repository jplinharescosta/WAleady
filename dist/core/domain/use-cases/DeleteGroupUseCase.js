"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteGroupUseCase = void 0;
class DeleteGroupUseCase {
    constructor(groupRepository) {
        this.groupRepository = groupRepository;
    }
    async execute(id) {
        // Validar ID
        if (!id) {
            throw new Error("Invalid group ID");
        }
        if (typeof id !== "string") {
            throw new Error("Group ID must be a string");
        }
        // Verificar se o grupo existe
        const group = await this.groupRepository.findById(id);
        if (!group) {
            return { success: false, message: "Group not found" };
        }
        // Deleta do Banco de Dados
        const deleted = await this.groupRepository.delete(id);
        return {
            success: deleted,
            message: deleted ? "Group deleted successfully" : "Failed to delete group",
            data: deleted
        };
    }
}
exports.DeleteGroupUseCase = DeleteGroupUseCase;
//# sourceMappingURL=DeleteGroupUseCase.js.map