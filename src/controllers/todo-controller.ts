import lodash from 'lodash';

import { BaseController } from './base-controller';
import { NextFunction, Response, Router } from 'express';
import { Validation } from '@helpers';
import { TodoItem } from '@models';
import { AppContext, Errors, ExtendedRequest, ValidationFailure } from '@typings';
import { createTodoValidator } from '@validators';

export class TodoController extends BaseController {
  public basePath: string = '/todos';
  public router: Router = Router();

  constructor(ctx: AppContext) {
    super(ctx);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.basePath}`, createTodoValidator(), this.createTodo);

    this.router.delete(`${this.basePath}/:id`, this.deleteTodo);

    this.router.get(`${this.basePath}`, this.getTodos);
  }

  private createTodo = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const failures: ValidationFailure[] = Validation.extractValidationErrors(req);
    if (failures.length > 0) {
      const valError = new Errors.ValidationError(
        res.__('DEFAULT_ERRORS.VALIDATION_FAILED'),
        failures
      );
      return next(valError);
    }

    const { title } = req.body;
    const todo = await this.appContext.todoRepository.save(
      new TodoItem({
        title
      })
    );
    res.status(201).json(todo.serialize());
  };

  private deleteTodo = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const todo = await this.appContext.todoRepository.update(
      { _id: id, isActive: true },
      { $set: { isActive: false } }
    );

    if (todo?._id) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  };

  private getTodos = async (
    req: ExtendedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    const todos = await this.appContext.todoRepository.getAll({
      isActive: true
    })
    res.status(200).json(todos);
  }
}
