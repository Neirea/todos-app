import { Router } from 'express';
import todoController from '../../controllers/todo.controller';
import validator from '../../validators/generic.validator';
import { tryCatch } from '../../middleware/try-catch.middleware';
import { Todo } from '../../entities/todo.entity';
import { todoSchema } from '../../validators/schemas.validator';
import { requireAuth } from '../../middleware/auth.middleware';

const todosRouter: Router = Router();

todosRouter.get(
  '/:id',
  requireAuth({ allowFailed: true }),
  tryCatch(todoController.getOneById.bind(todoController))
);
todosRouter.get(
  '/',
  requireAuth({ allowFailed: true }),
  validator.validateRequestData(todoSchema),
  tryCatch(todoController.getAll.bind(todoController))
);
todosRouter.post(
  '/',
  requireAuth(),
  validator.validateRequestData(todoSchema),
  tryCatch(todoController.create.bind(todoController))
);
todosRouter.put(
  '/:id',
  requireAuth(),
  validator.validateRequestData(todoSchema),
  validator.isExists(Todo),
  tryCatch(todoController.updateById.bind(todoController))
);
todosRouter.delete(
  '/:id',
  requireAuth(),
  validator.isExists(Todo),
  tryCatch(todoController.deleteById.bind(todoController))
);

export default todosRouter;
