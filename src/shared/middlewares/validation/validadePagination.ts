import { Request, Response, NextFunction } from 'express';
import { sendValidationError } from '../errors/validationErrorResponse';
import { PaginationParams } from '../../../types';

interface ValidationError {
  field: string;
  issue: string;
}

export function validatePagination(
  req: Request & { pagination?: PaginationParams },
  res: Response,
  next: NextFunction
): void {
  const page = req.query.page !== undefined ? Number(req.query.page) : 1;
  const limit = req.query.limit !== undefined ? Number(req.query.limit) : 10;
  const errors: ValidationError[] = [];

  if (!Number.isInteger(page) || page < 1) {
    errors.push({
      field: 'page',
      issue: 'Page must be a positive integer.'
    });
  }

  if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
    errors.push({
      field: 'limit',
      issue: 'Limit must be an integer between 1 and 100.'
    });
  }

  if (errors.length > 0) {
    sendValidationError(res, errors);
    return;
  }

  req.pagination = { page, limit };
  next();
}
