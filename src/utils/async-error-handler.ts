import { NextFunction, Request, Response } from 'express';

type AsyncExpressMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const tryCatch = (func: AsyncExpressMiddleware) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await func(req, res, next);
  } catch (err) {
    next(err);
  }
};
