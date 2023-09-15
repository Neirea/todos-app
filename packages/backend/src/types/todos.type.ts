import { Todo } from '../entities/todo.entity';
import { EntityInstanceType } from './generic.type';

export type TTodo = EntityInstanceType<typeof Todo>;
export type TUpdateTodo = Omit<TTodo, 'created_at' | 'updated_at'>;
export type TCreateTodo = Omit<TUpdateTodo, 'id'>;
export type TTodoStatus = 'private' | 'public' | 'completed';
export type TTodoQueryParams = {
  skip?: string;
  take?: string;
  search?: string;
  status?: TTodoStatus;
};
