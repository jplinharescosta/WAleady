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
        return res.status(400).json({
          success: false,
          message: "Name and createdBy are required",
        });
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
      res.status(400).json({
        success: false,
        message: error.message,
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
    } catch (error) {
      console.error("Error deleting group:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getGroups(req, res) {
    try {
      //TODO: Add pagination
      const { isActive, createdBy } = req.query;
      const { limit, offset } = req.pagination;
      const filters = {};

      if (isActive !== undefined) filters.isActive = isActive === "true";
      if (createdBy) filters.createdBy = createdBy;
      if (limit) filters.limit = limit;
      if (offset) filters.offset = offset;

      const groups = await this.groupRepository.findAll(filters);

      res.status(200).json({
        success: true,
        data: groups.map((group) => group.toJSON()),
        count: groups.length,
      });
    } catch (error) {
      console.error("Error fetching groups:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getGroupById(req, res) {
    try {
      const { id } = req.params;
      const group = await this.groupRepository.findById(id);

      if (!group) {
        return res.status(404).json({
          success: false,
          message: "Group not found",
        });
      }

      res.status(200).json({
        success: true,
        data: group.toJSON(),
      });
    } catch (error) {
      console.error("Error fetching group:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = GroupController;
