import { Request, Response, NextFunction } from 'express';
import { ResponseHandler } from './response-handler';

export const globalErrorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);

  ResponseHandler.error(err, res);

  next();
};
