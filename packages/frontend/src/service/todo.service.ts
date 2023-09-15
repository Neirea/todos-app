import { APP_KEYS } from '../modules/common/consts';
import {
  TCreateTodo,
  TFindTodos,
  TSearchParams,
  TTodo,
  TUpdateTodo
} from '../modules/common/types/todo.type';
import { deleteEmptyProperties } from '../modules/common/utils/delete-empty-properties.util';
import { toNumber } from '../modules/common/utils/string-to-number.util';
import { TODOS_PER_PAGE } from '../modules/todos/todos-page/todos-list/todos.const';
import HttpService from './http.service';

class TodoService extends HttpService {
  async getAll(filter: TSearchParams) {
    const queryString = this.getQueryString(filter);
    const result = await this.get<TFindTodos>({
      url: `${APP_KEYS.BACKEND_KEYS.TODOS}?${queryString}`
    });
    return { todos: result.data.todos, total: +result.data.total };
  }

  async getOneById(id: string) {
    const result = await this.get<TTodo>({ url: `${APP_KEYS.BACKEND_KEYS.TODOS}/${id}` });
    return result.data;
  }

  async updateOne(todo: TUpdateTodo) {
    const { id, ...data } = todo;
    const result = await this.put<boolean>({
      url: `${APP_KEYS.BACKEND_KEYS.TODOS}/${id}`,
      data
    });
    return result.data;
  }

  async create(todo: TCreateTodo) {
    const result = await this.post<boolean>({
      url: APP_KEYS.BACKEND_KEYS.TODOS,
      data: todo
    });
    return result.data;
  }

  async deleteById(id: string) {
    const result = await this.delete<boolean>({ url: `${APP_KEYS.BACKEND_KEYS.TODOS}/${id}` });
    return result.data;
  }

  private getQueryString = (filter: TSearchParams) => {
    const filterData = deleteEmptyProperties({ status: filter.status, search: filter.search });
    const filterPageNumber = toNumber(filter.page, 1);
    const queryParams = {
      skip: ((filterPageNumber - 1) * TODOS_PER_PAGE).toString(),
      take: TODOS_PER_PAGE.toString(),
      ...filterData
    };
    return new URLSearchParams(queryParams).toString();
  };
}

const todoService = new TodoService();

export default todoService;
