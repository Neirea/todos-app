import { Request, Response, NextFunction } from 'express';
import handleError from '../errors/handle-error.util';

export const tryCatch =
  (handler: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      handleError(error, res);
    }
  };
