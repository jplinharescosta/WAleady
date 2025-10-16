import { IBroadcastRepository } from '../../../../domain/repositories/interfaces';
import client from '../../../../../shared/config/redis';

export class RedisBroadcastRepository implements IBroadcastRepository {
  async ping(): Promise<any> {
    const pong = await client.ping();
    const res = {
      status: 'success',
      message: 'Pong from Redis',
      data: pong
    };
    console.log(res);
    return res;

    //TODO: Implementar métodos de broadcast usando Redis
  }
}
