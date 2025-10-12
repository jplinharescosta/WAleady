class BroadcastController {
  constructor(sendBroadcastUseCase) {
    this.sendBroadcastUseCase = sendBroadcastUseCase;
  }

  async sendBroadcast(req, res) {
    try {
      const broadcastData = req.body;
      const result = await this.sendBroadcastUseCase.execute(broadcastData);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
}

module.exports = BroadcastController;
