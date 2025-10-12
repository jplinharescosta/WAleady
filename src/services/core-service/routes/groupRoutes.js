const express = require("express");
const router = express.Router();
const { groupController } = require("../controllers"); // importa já configurado
const validadePagination = require("../../../shared/middlewares/validation/validadePagination");
const validadeIdParam = require("../../../shared/middlewares/validation/validadeIdParam");

router.post("/", (req, res) => groupController.createGroup(req, res));
router.get("/", validadePagination, (req, res) => {
  groupController.getGroups(req, res);
});
router.get("/:id", validadeIdParam, (req, res) =>
  groupController.getGroupById(req, res)
);
router.delete("/:id", validadeIdParam, (req, res) =>
  groupController.deleteGroup(req, res)
);

module.exports = router;
