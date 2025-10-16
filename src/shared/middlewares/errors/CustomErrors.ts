import { CustomErrors } from '../../../types';

interface ICustomErrors {
  code: string;
  details: CustomErrors;
}

export class ValidationError extends Error implements ICustomErrors {
  code: string;
  details: CustomErrors;
  constructor(
    message: string,
    details: CustomErrors,
    code: string = 'VALIDATION_ERROR'
  ) {
    super(message);
    this.name = 'ValidationError';
    this.details = details;
    this.code = code;
  }
}

export class NotFoundError extends Error implements ICustomErrors {
  code: string;
  details: CustomErrors;
  constructor(
    message: string,
    details: CustomErrors,
    code: string = 'NOT_FOUND_ERROR'
  ) {
    super(message);
    this.name = 'NotFoundError';
    this.details = details;
    this.code = code;
  }
}
