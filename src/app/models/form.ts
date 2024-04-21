import { EventProperty } from './event';

export enum StringOperator {
  EQUAL = 'equals',
  NOT_EQUAL = 'does not equals',
  CONTAIN = 'contains',
  NOT_CONTAIN = 'does not contain',
}

export enum NumberOperator {
  EQUALS = 'equals to',
  BETWEEN = 'in between',
  LESS = 'less than',
  GREATER = 'greater than',
}

export interface Attribute {
  property: EventProperty;
  operator: StringOperator | NumberOperator;
  operands: string[];
}

export interface FormStep {
  name: string;
  event: string;
  attributes: Attribute[];
}
