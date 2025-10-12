"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
class Group {
    constructor(data) {
        this.validateInput(data);
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.createdBy = data.createdBy;
        this.participantsCount = data.participantsCount ?? 0;
        this.whatsappGroupInviteLink = data.whatsappGroupInviteLink ?? null;
        this.whatsappGroupId = data.whatsappGroupId ?? null;
        this.isActive = data.isActive ?? true;
        this.isFull = data.isFull ?? false;
        this.createdAt = data.createdAt ?? new Date();
        this.updatedAt = new Date();
    }
    validateInput(data) {
        if (!data.name || typeof data.name !== "string" || data.name.trim().length === 0) {
            throw new Error("Group name is required and must be a non-empty string");
        }
        if (data.name.length > 100) {
            throw new Error("Group name cannot exceed 100 characters");
        }
        if (!data.createdBy || typeof data.createdBy !== "string") {
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
exports.Group = Group;
//# sourceMappingURL=Group.js.map