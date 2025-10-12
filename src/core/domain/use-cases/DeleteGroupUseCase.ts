import { IGroupRepository } from "../repositories/interfaces";
import { ApiResponse } from "../../../types";

export class DeleteGroupUseCase {
  constructor(private groupRepository: IGroupRepository) {}

  async execute(id: string): Promise<ApiResponse<boolean>> {
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