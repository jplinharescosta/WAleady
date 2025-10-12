import { Request, Response, NextFunction } from "express";
import { getLogger } from "../../logger/logger";

interface RequestWithLogging extends Request {
  requestId?: string;
  log?: any;
}

function genRequestId(): string {
  return (
    Date.now().toString(36) + Math.random().toString(36).substring(2, 7)
  ).toUpperCase();
}

export default function requestLogger(
  req: RequestWithLogging,
  res: Response,
  next: NextFunction
): void {
  const requestId = genRequestId();
  const start = process.hrtime.bigint();

  const baseLogger = getLogger({ service: "core", requestId });
  req.requestId = requestId;
  req.log = baseLogger.child({ route: req.path, method: req.method });

  req.log.info({ msg: "request:start" });

  res.on("finish", () => {
    const end = process.hrtime.bigint();
    const durationMs = Number(end - start) / 1e6;

    req.log.info({
      msg: "request:end",
      status: res.statusCode,
      durationMs: Number(durationMs.toFixed(2)),
    });
  });

  next();
}