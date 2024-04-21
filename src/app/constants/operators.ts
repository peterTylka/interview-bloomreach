import { NumberOperator, StringOperator } from '../models';

export const NUMBER_OPERATORS = [
  NumberOperator.EQUALS,
  NumberOperator.BETWEEN,
  NumberOperator.LESS,
  NumberOperator.GREATER,
];

export const STRING_OPERATORS = [
  StringOperator.EQUAL,
  StringOperator.NOT_EQUAL,
  StringOperator.CONTAIN,
  StringOperator.NOT_CONTAIN,
];
