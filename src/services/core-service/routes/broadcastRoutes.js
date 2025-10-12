const express = require("express");
const router = express.Router();
const { broadcastController } = require("../controllers");

router.get("/", (req, res) => broadcastController.sendBroadcast(req, res));

module.exports = router;
