import { Request, Response } from 'express';
import { SendBroadcastUseCase } from '../../../core/domain/use-cases/SendBroadcastUseCase';
export declare class BroadcastController {
    private sendBroadcastUseCase;
    constructor(sendBroadcastUseCase: SendBroadcastUseCase);
    sendBroadcast(req: Request, res: Response): Promise<void>;
}
