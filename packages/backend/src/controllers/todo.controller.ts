import { Response, Request } from 'express';
import TodoService from '../services/todo.service';
import { TCreateTodo, TUpdateTodo } from '../types/todos.type';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAll(req: Request, res: Response) {
    const userId = req.user?.id;
    const data = await this.todoService.findAll(userId, req.query);
    res.send(data);
  }

  async getOneById(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.user?.id;
    const todo = await this.todoService.findOneById(id, userId);
    res.send(todo);
  }

  async create(req: Request, res: Response) {
    const userId = req.user!.id;
    const todo: TCreateTodo = { ...req.body, user_id: userId };
    await this.todoService.create(todo);
    res.send(true);
  }

  async updateById(req: Request, res: Response) {
    const { id } = req.params;
    const { id: userId } = req.user!;
    const todo: TUpdateTodo = { ...req.body, id, user_id: userId };
    await this.todoService.updateById(todo);
    res.send(true);
  }

  async deleteById(req: Request, res: Response) {
    const { id } = req.params;
    const { id: userId } = req.user!;
    await this.todoService.deleteById(id, userId);
    res.send(true);
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
