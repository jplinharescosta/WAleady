"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const validadePagination_1 = require("../../../shared/middlewares/validation/validadePagination");
const validadeIdParam_1 = require("../../../shared/middlewares/validation/validadeIdParam");
const router = express_1.default.Router();
router.post("/", (req, res) => controllers_1.groupController.createGroup(req, res));
router.get("/", validadePagination_1.validatePagination, (req, res) => {
    controllers_1.groupController.getGroups(req, res);
});
router.get("/:id", validadeIdParam_1.validateIdParam, (req, res) => controllers_1.groupController.getGroupById(req, res));
router.delete("/:id", validadeIdParam_1.validateIdParam, (req, res) => controllers_1.groupController.deleteGroup(req, res));
exports.default = router;
//# sourceMappingURL=groupRoutes.js.map