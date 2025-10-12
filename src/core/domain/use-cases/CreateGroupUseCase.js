const Group = require("../entities/Group");

class CreateGroupUseCase {
  constructor(groupRepository) {
    this.groupRepository = groupRepository;
  }

  async execute({ name, description, createdBy }) {
    // 1. Validar dados (a entidade já faz isso)
    const group = new Group({
      name: name,
      description: description,
      createdBy: createdBy,
    });

    // 2. Verificar se o grupo já existe
    const findGroup = await this.groupRepository.findByName(name);
    if (findGroup) {
      throw new Error("Group already exists");
    }

    // 3. Salvar no banco de dados
    const savedGroup = await this.groupRepository.create(group);

    console.log(
      `📝 Group created: ${savedGroup.name} by ${savedGroup.createdBy}`
    );

    return savedGroup;
  }
}

module.exports = CreateGroupUseCase;
