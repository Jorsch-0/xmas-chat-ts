import { NextFunction, Request as ExpressRequest, Response } from 'express';
import { CustomError } from '../../utils';
import jwt from 'jsonwebtoken';
import { env } from '../../config';

export interface Request extends ExpressRequest {
  user?: any;
}

export const authenticate = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      throw CustomError.unauthorized('Unauthorized');
    }

    const payload = jwt.verify(token, env.JWT_SECRET);
    if (!payload) {
      throw CustomError.unauthorized('Invalid token');
    }

    req.user = payload;

    next();
  } catch (err) {
    next(err);
  }
};
