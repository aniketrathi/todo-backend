import { check, ValidationChain } from 'express-validator';

const createTodoValidator = (): ValidationChain[] => [
  check('title', 'VALIDATION_ERRORS.INVALID_TITLE').notEmpty(),
];

export default createTodoValidator;