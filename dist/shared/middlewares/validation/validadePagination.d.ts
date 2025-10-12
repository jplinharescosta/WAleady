import { Request, Response, NextFunction } from 'express';
import { PaginationParams } from '../../../types';
export declare function validatePagination(req: Request & {
    pagination?: PaginationParams;
}, res: Response, next: NextFunction): void;
