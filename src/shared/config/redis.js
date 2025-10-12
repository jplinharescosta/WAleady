const { createClient } = require("redis");
require("dotenv").config();

const client = createClient();

client
  .connect()
  .then(() => console.log("Connected to Redis"))
  .catch((err) => console.error("Redis connection error:", err));
client.on("error", (err) => console.error(err));
module.exports = client;
