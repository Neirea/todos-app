import { User } from '../entities/user.entity';
import { EntityInstanceType } from './generic.type';

export type TUser = EntityInstanceType<typeof User>;

export type TCreateUser = Pick<TUser, 'email' | 'password' | 'verification_token'>;

export type TJwtUser = Pick<TUser, 'id' | 'email'>;
