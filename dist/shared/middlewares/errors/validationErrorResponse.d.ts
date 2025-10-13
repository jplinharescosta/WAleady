import { Response } from "express";
/**
 * Sends a standardized validation response.
 * @param res - Express Response
 * @param details - Error details
 * @param message - Main message
 * @param status - HTTP status code (default 400)
 */
export declare function sendValidationError(
  res: Response,
  details: any,
  message?: string,
  status?: number,
): Response;
