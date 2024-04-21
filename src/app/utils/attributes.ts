import { NUMBER_OPERATORS, STRING_OPERATORS } from '../constants';
import { EventProperty, NumberOperator, StringOperator } from '../models';

export function getAttributeOperators(property: EventProperty | null) {
  return property?.type === 'number' ? NUMBER_OPERATORS : STRING_OPERATORS;
}

export function getNewOperands(operator: StringOperator | NumberOperator) {
  return operator === NumberOperator.BETWEEN ? ['', ''] : [''];
}
