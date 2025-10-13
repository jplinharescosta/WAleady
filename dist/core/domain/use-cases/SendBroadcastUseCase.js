"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendBroadcastUseCase = void 0;
class SendBroadcastUseCase {
  constructor(broadcastRepository) {
    this.broadcastRepository = broadcastRepository;
  }
  async execute(broadcastData) {
    const data = await this.broadcastRepository.ping();
    console.log(data);
    return data;
    //TODO: Implementar lógica de envio de broadcast
  }
}
exports.SendBroadcastUseCase = SendBroadcastUseCase;
//# sourceMappingURL=SendBroadcastUseCase.js.map
