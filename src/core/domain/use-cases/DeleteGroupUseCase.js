class DeleteGroupUseCase {
  constructor(groupRepository) {
    this.groupRepository = groupRepository;
  }

  async execute(id) {
    // Validar ID
    if (!id) {
      throw new Error("Invalid group ID");
    }
    if (typeof id !== "number") {
      throw new Error("Group ID must be a number");
    }

    // Verificar se o grupo existe
    const group = await this.groupRepository.findById(id);
    if (!group) {
      return { success: false, message: "Group not found" };
    }

    // Deleta do Banco de Dados
    return await this.groupRepository.deleteById(id);
  }
}

module.exports = DeleteGroupUseCase;
