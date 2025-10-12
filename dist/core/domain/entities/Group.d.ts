import { GroupData } from '../../../types';
export declare class Group {
    readonly id?: string;
    readonly name: string;
    readonly description?: string;
    readonly createdBy: string;
    participantsCount: number;
    whatsappGroupInviteLink: string | null;
    whatsappGroupId: string | null;
    isActive: boolean;
    isFull: boolean;
    readonly createdAt: Date;
    updatedAt: Date;
    constructor(data: GroupData);
    private validateInput;
    addParticipant(): void;
    toJSON(): GroupData;
}
