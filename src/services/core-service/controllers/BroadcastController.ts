import { Request, Response } from 'express';
import { SendBroadcastUseCase } from '../../../core/domain/use-cases/SendBroadcastUseCase';
import { BroadcastData } from '../../../types';

export class BroadcastController {
  constructor(private sendBroadcastUseCase: SendBroadcastUseCase) {}

  async sendBroadcast(req: Request, res: Response): Promise<void> {
    try {
      const broadcastData: BroadcastData = req.body;
      const result = await this.sendBroadcastUseCase.execute(broadcastData);
      res.status(200).json(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(400).json({ success: false, error: errorMessage });
    }
  }
}