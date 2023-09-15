import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { TJwtUser } from '../types/users.type';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

export const jwtStrategy = new JwtStrategy(options, async (payload: TJwtUser, done) =>
  done(null, payload)
);
