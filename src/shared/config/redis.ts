import { createClient, RedisClientType } from "redis";
import "dotenv/config";

const client: RedisClientType = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

client
  .connect()
  .then(() => console.log("Connected to Redis"))
  .catch((err: Error) => console.error("Redis connection error:", err));

client.on("error", (err: Error) => console.error(err));

export default client;
