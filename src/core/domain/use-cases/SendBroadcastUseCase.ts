import { BroadcastData, BroadcastResult } from "../../../types";
import { IBroadcastRepository } from "../repositories/interfaces";

export class SendBroadcastUseCase {
  constructor(private broadcastRepository: IBroadcastRepository) {}

  async execute(broadcastData: BroadcastData): Promise<BroadcastResult> {
    const data = await this.broadcastRepository.ping();
    console.log(data);

    return data;

    //TODO: Implementar lógica de envio de broadcast
  }
}