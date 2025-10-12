const PostgresGroupRepository = require("../../../core/infrastructure/database/postgres/repositories/PostgresGroupRepository");
const CreateGroupUseCase = require("../../../core/domain/use-cases/CreateGroupUseCase");
const DeleteGroupUseCase = require("../../../core/domain/use-cases/DeleteGroupUseCase");
const GroupController = require("./GroupController");
const BroadcastController = require("./broadcastController");
const RedisBroadcastRepository = require("../../../core/infrastructure/database/redis/repositories/RedisBroadcastRepository");
const SendBroadcastUseCase = require("../../../core/domain/use-cases/SendBroadcastUseCase");

// Broadcast Controller Setup
const redisBroadcastRepository = new RedisBroadcastRepository();
const sendBroadcastUseCase = new SendBroadcastUseCase(redisBroadcastRepository);

const broadcastController = new BroadcastController(sendBroadcastUseCase);

// Group Controller Setup
const groupRepository = new PostgresGroupRepository();
const createGroupUseCase = new CreateGroupUseCase(groupRepository);
const deleteGroupUseCase = new DeleteGroupUseCase(groupRepository);

const groupController = new GroupController(
  createGroupUseCase,
  deleteGroupUseCase,
  groupRepository
);

module.exports = { groupController, broadcastController };
