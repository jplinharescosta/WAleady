"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BroadcastController = void 0;
class BroadcastController {
    constructor(sendBroadcastUseCase) {
        this.sendBroadcastUseCase = sendBroadcastUseCase;
    }
    async sendBroadcast(req, res) {
        try {
            const broadcastData = req.body;
            const result = await this.sendBroadcastUseCase.execute(broadcastData);
            res.status(200).json(result);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(400).json({ success: false, error: errorMessage });
        }
    }
}
exports.BroadcastController = BroadcastController;
//# sourceMappingURL=BroadcastController.js.map