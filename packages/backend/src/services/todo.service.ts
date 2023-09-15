import { Brackets, SelectQueryBuilder } from 'typeorm';
import type { TCreateTodo, TTodoQueryParams, TTodoStatus, TUpdateTodo } from '../types/todos.type';
import { Todo } from '../entities/todo.entity';

export default class TodoService {
  async findAll(userId: string | undefined, query: TTodoQueryParams) {
    const { status, search } = query;
    const queryBuilder = Todo.createQueryBuilder('todo').where('1 = 1').orderBy('todo.created_at');
    this.filterByUser(queryBuilder, userId);
    this.filterByStatus(queryBuilder, status, userId);
    this.filterBySearch(queryBuilder, search);
    this.paginate(queryBuilder, query.skip, query.take);
    const total = await queryBuilder.getCount();
    const todos = await queryBuilder.getMany();
    return { todos, total };
  }

  findOneById(todoId: string, userId: string | undefined) {
    const queryBuilder = Todo.createQueryBuilder('todo');
    queryBuilder.where('todo.id = :todoId', { todoId });
    this.filterByUser(queryBuilder, userId);
    return queryBuilder.getOne();
  }

  async create(todo: TCreateTodo) {
    const query = Todo.createQueryBuilder().insert().into(Todo).values(todo);
    return query.execute();
  }

  async updateById(todo: TUpdateTodo) {
    const query = Todo.createQueryBuilder('todo')
      .update()
      .set(todo)
      .where('todo.id = :todoId', { todoId: todo.id })
      .andWhere('todo.user_id = :userId', { userId: todo.user_id });
    return query.execute();
  }

  async deleteById(todoId: string, userId: string) {
    const query = Todo.createQueryBuilder('todo')
      .delete()
      .where('todo.id = :todoId', { todoId })
      .andWhere('todo.user_id = :userId', { userId });
    return query.execute();
  }

  private filterByUser(queryBuilder: SelectQueryBuilder<Todo>, userId: string | undefined) {
    if (!userId) {
      queryBuilder.andWhere('todo.is_private = :isPrivate', { isPrivate: false });
    }
    queryBuilder.andWhere(
      new Brackets((qb) => {
        qb.where('todo.user = :userId', { userId }).orWhere('todo.is_private = :isPrivate', {
          isPrivate: false
        });
      })
    );
  }

  private filterByStatus(
    queryBuilder: SelectQueryBuilder<Todo>,
    status: TTodoStatus | undefined,
    userId: string | undefined
  ) {
    if (status === 'completed') {
      queryBuilder.andWhere('todo.is_completed = :isCompleted', { isCompleted: true });
    } else if (status === 'public') {
      queryBuilder.andWhere('todo.is_private = :isPrivate', { isPrivate: false });
    } else if (status === 'private' && userId) {
      queryBuilder
        .andWhere('todo.user = :userId', { userId })
        .andWhere('todo.is_private = :isPrivate', { isPrivate: true });
    }
  }

  private filterBySearch(queryBuilder: SelectQueryBuilder<Todo>, search: string | undefined) {
    if (search) {
      queryBuilder.andWhere('todo.title ilike :search', { search: `%${search}%` });
    }
  }

  private paginate(
    queryBuilder: SelectQueryBuilder<Todo>,
    skip: string | undefined,
    take: string | undefined
  ) {
    if (skip === undefined || take === undefined) return;
    queryBuilder.skip(+skip).take(+take);
  }
}
