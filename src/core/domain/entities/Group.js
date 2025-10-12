class Group {
  constructor({
    id,
    name,
    description,
    createdBy,
    participantsCount = 0,
    whatsappGroupInviteLink = null,
    whatsappGroupId = null,
    isActive = true,
    isFull = false,
    createdAt = new Date(),
  }) {
    this.validateInput({ name, createdBy });

    this.id = id;
    this.name = name;
    this.description = description;
    this.createdBy = createdBy;
    this.participantsCount = participantsCount;
    this.whatsappGroupInviteLink = whatsappGroupInviteLink;
    this.whatsappGroupId = whatsappGroupId;
    this.isActive = isActive;
    this.isFull = isFull;
    this.createdAt = createdAt;
    this.updatedAt = new Date();
  }

  validateInput({ name, createdBy }) {
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      throw new Error("Group name is required and must be a non-empty string");
    }

    if (name.length > 100) {
      throw new Error("Group name cannot exceed 100 characters");
    }

    if (!createdBy || typeof createdBy !== "string") {
      throw new Error("Group creator is required and must be a string");
    }
  }

  addParticipant() {
    this.participantsCount += 1;
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      createdBy: this.createdBy,
      whatsappGroupId: this.whatsappGroupId,
      isActive: this.isActive,
      isFull: this.isFull,
      participantsCount: this.participantsCount,
      whatsappGroupInviteLink: this.whatsappGroupInviteLink,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = Group;
