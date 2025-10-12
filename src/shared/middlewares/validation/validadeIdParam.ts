import { Request, Response, NextFunction } from 'express';
import { sendValidationError } from '../errors/validationErrorResponse';

interface ValidationError {
  field: string;
  issue: string;
}

export function validateIdParam(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const id = req.params.id;

  // For TypeScript migration, we'll keep IDs as strings (UUIDs are common in modern apps)
  if (!id || typeof id !== 'string' || id.trim().length === 0) {
    sendValidationError(res, [
      { field: "id", issue: "ID must be a non-empty string." },
    ]);
    return;
  }

  next();
}