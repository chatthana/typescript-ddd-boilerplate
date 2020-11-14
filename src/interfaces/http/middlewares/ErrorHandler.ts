import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(INTERNAL_SERVER_ERROR).json({
    status: err.statusCode || '500',
    message: err.message
  });
};
