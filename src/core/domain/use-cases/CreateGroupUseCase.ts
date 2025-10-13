import { Group } from "../entities/Group";
import { CreateGroupRequest } from "../../../types";
import { IGroupRepository } from "../repositories/interfaces";

export class CreateGroupUseCase {
  constructor(private groupRepository: IGroupRepository) {}

  async execute({
    name,
    description,
    createdBy,
  }: CreateGroupRequest): Promise<Group> {
    // 1. Validar dados (a entidade já faz isso)
    const group = new Group({
      name,
      description,
      createdBy,
    });

    // 2. Verificar se o grupo já existe
    const findGroup = await this.groupRepository.findByName(name);
    if (findGroup) {
      throw new Error("Group already exists");
    }

    // 3. Salvar no banco de dados
    const savedGroup = await this.groupRepository.create(group);

    console.log(
      `📝 Group created: ${savedGroup.name} by ${savedGroup.createdBy}`,
    );

    return savedGroup;
  }
}
