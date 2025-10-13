import { Request, Response, NextFunction } from "express";
interface RequestWithLogging extends Request {
  requestId?: string;
  log?: any;
}
export default function requestLogger(
  req: RequestWithLogging,
  res: Response,
  next: NextFunction,
): void;
export {};
