"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
require("dotenv/config");
const client = (0, redis_1.createClient)({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});
client
    .connect()
    .then(() => console.log("Connected to Redis"))
    .catch((err) => console.error("Redis connection error:", err));
client.on("error", (err) => console.error(err));
exports.default = client;
//# sourceMappingURL=redis.js.map