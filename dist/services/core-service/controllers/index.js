"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupController = exports.broadcastController = void 0;
const PostgresGroupRepository_1 = require("../../../core/infrastructure/database/postgres/repositories/PostgresGroupRepository");
const CreateGroupUseCase_1 = require("../../../core/domain/use-cases/CreateGroupUseCase");
const DeleteGroupUseCase_1 = require("../../../core/domain/use-cases/DeleteGroupUseCase");
const GroupController_1 = require("./GroupController");
const BroadcastController_1 = require("./BroadcastController");
const RedisBroadcastRepository_1 = require("../../../core/infrastructure/database/redis/repositories/RedisBroadcastRepository");
const SendBroadcastUseCase_1 = require("../../../core/domain/use-cases/SendBroadcastUseCase");
// Broadcast Controller Setup
const redisBroadcastRepository =
  new RedisBroadcastRepository_1.RedisBroadcastRepository();
const sendBroadcastUseCase = new SendBroadcastUseCase_1.SendBroadcastUseCase(
  redisBroadcastRepository,
);
exports.broadcastController = new BroadcastController_1.BroadcastController(
  sendBroadcastUseCase,
);
// Group Controller Setup
const groupRepository = new PostgresGroupRepository_1.PostgresGroupRepository();
const createGroupUseCase = new CreateGroupUseCase_1.CreateGroupUseCase(
  groupRepository,
);
const deleteGroupUseCase = new DeleteGroupUseCase_1.DeleteGroupUseCase(
  groupRepository,
);
exports.groupController = new GroupController_1.GroupController(
  createGroupUseCase,
  deleteGroupUseCase,
  groupRepository,
);
//# sourceMappingURL=index.js.map
