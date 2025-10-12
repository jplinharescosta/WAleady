export interface GroupData {
    id?: string;
    name: string;
    description?: string;
    createdBy: string;
    participantsCount?: number;
    whatsappGroupInviteLink?: string | null;
    whatsappGroupId?: string | null;
    isActive?: boolean;
    isFull?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface CreateGroupRequest {
    name: string;
    description?: string;
    createdBy: string;
}
export interface BroadcastData {
    groupIds: string[];
    message: string;
    createdBy: string;
}
export interface BroadcastResult {
    success: boolean;
    message: string;
    broadcastId?: string;
    sentToGroups?: number;
}
export interface PaginationParams {
    page: number;
    limit: number;
}
export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}
export interface DatabaseConfig {
    user: string;
    host: string;
    database: string;
    password: string;
    port: number;
}
export interface RedisConfig {
    host: string;
    port: number;
    password?: string;
}
export interface LoggerOptions {
    service: string;
    level?: string;
    [key: string]: any;
}
