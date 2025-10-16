import { PostgresGroupRepository } from '../../../core/infrastructure/database/postgres/repositories/PostgresGroupRepository';
import { CreateGroupUseCase } from '../../../core/domain/use-cases/CreateGroupUseCase';
import { DeleteGroupUseCase } from '../../../core/domain/use-cases/DeleteGroupUseCase';
import { GroupController } from './GroupController';
import { BroadcastController } from './BroadcastController';
import { RedisBroadcastRepository } from '../../../core/infrastructure/database/redis/repositories/RedisBroadcastRepository';
import { SendBroadcastUseCase } from '../../../core/domain/use-cases/SendBroadcastUseCase';
import { UpdateGroupUseCase } from '../../../core/domain/use-cases/UpdateGroupUseCase';

// Broadcast Controller Setup
const redisBroadcastRepository = new RedisBroadcastRepository();
const sendBroadcastUseCase = new SendBroadcastUseCase(redisBroadcastRepository);

export const broadcastController = new BroadcastController(
  sendBroadcastUseCase
);

// Group Controller Setup
const groupRepository = new PostgresGroupRepository();
const createGroupUseCase = new CreateGroupUseCase(groupRepository);
const deleteGroupUseCase = new DeleteGroupUseCase(groupRepository);
const updateGroupUseCase = new UpdateGroupUseCase(groupRepository);

export const groupController = new GroupController(
  createGroupUseCase,
  deleteGroupUseCase,
  updateGroupUseCase,
  groupRepository
);
