import { GroupData } from "../../../types";

export class Group {
  public readonly id?: string;
  public readonly name: string;
  public readonly description?: string;
  public readonly createdBy: string;
  public participantsCount: number;
  public whatsappGroupInviteLink: string | null;
  public whatsappGroupId: string | null;
  public isActive: boolean;
  public isFull: boolean;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(data: GroupData) {
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

  private validateInput(data: GroupData): void {
    if (
      !data.name ||
      typeof data.name !== "string" ||
      data.name.trim().length === 0
    ) {
      throw new Error("Group name is required and must be a non-empty string");
    }

    if (data.name.length > 100) {
      throw new Error("Group name cannot exceed 100 characters");
    }

    if (!data.createdBy || typeof data.createdBy !== "string") {
      throw new Error("Group creator is required and must be a string");
    }
  }

  public addParticipant(): void {
    this.participantsCount += 1;
    this.updatedAt = new Date();
  }

  public toJSON(): GroupData {
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
