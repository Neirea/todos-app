import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { TJwtUser } from '../types/users.type';

export const requireAuth =
  ({ allowFailed = false }: { allowFailed?: boolean } = {}) =>
  (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate('jwt', { session: false }, (err: Error, user: TJwtUser | undefined) => {
      if ((!allowFailed && !user) || err) {
        return res.status(401).send('Unauthorized');
      }
      if (user) {
        req.user = user;
      }
      next();
    })(req, res, next);
