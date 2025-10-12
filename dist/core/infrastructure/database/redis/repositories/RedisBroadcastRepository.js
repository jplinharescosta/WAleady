"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisBroadcastRepository = void 0;
const redis_1 = __importDefault(require("../../../../../shared/config/redis"));
class RedisBroadcastRepository {
    async ping() {
        const pong = await redis_1.default.ping();
        const res = {
            status: "success",
            message: "Pong from Redis",
            data: pong,
        };
        console.log(res);
        return res;
        //TODO: Implementar métodos de broadcast usando Redis
    }
}
exports.RedisBroadcastRepository = RedisBroadcastRepository;
//# sourceMappingURL=RedisBroadcastRepository.js.map