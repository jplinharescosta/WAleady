import { IBroadcastRepository } from "../../../../domain/repositories/interfaces";
export declare class RedisBroadcastRepository implements IBroadcastRepository {
    ping(): Promise<any>;
}
