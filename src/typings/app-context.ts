import { Repositories } from '@storage';
import { Logger } from '@typings';

export type AppContext = {
  logger: Logger;
  todoRepository: Repositories.TodoRepository;
};
