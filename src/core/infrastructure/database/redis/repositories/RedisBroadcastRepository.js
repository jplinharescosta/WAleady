const client = require("../../../../../shared/config/redis");

class RedisBroadcastRepository {
  async ping() {
    const pong = await client.ping();
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

module.exports = RedisBroadcastRepository;
