import { check, ValidationChain } from 'express-validator';

const createTodoValidator = (): ValidationChain[] => [
  check('title', 'VALIDATION_ERRORS.INVALID_TITLE').isString().notEmpty(),
];

export default createTodoValidator;
