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

module.exports = SendBroadcastUseCase;
