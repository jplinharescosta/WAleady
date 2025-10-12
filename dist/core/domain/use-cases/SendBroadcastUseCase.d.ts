import { BroadcastData, BroadcastResult } from "../../../types";
import { IBroadcastRepository } from "../repositories/interfaces";
export declare class SendBroadcastUseCase {
    private broadcastRepository;
    constructor(broadcastRepository: IBroadcastRepository);
    execute(broadcastData: BroadcastData): Promise<BroadcastResult>;
}
