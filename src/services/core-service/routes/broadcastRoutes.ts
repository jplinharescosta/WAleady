import express, { Request, Response } from "express";
import { broadcastController } from "../controllers";

const router = express.Router();

router.get("/", (req: Request, res: Response) =>
  broadcastController.sendBroadcast(req, res),
);

export default router;
