import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { EventsService } from './../../services/events/events.service';

import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { EventProperty } from '../../services/events/types';

enum StringOperator {
  EQUAL = 'equals',
  NOT_EQUAL = 'does not equals',
  CONTAIN = 'contains',
  NOT_CONTAIN = 'does not contain',
}
const STRING_OPERATORS = [
  StringOperator.EQUAL,
  StringOperator.NOT_EQUAL,
  StringOperator.CONTAIN,
  StringOperator.NOT_CONTAIN,
];

enum NumberOperator {
  EQUALS = 'equals to',
  BETWEEN = 'in between',
  LESS = 'less than',
  GREATER = 'greater than',
}
const NUMBER_OPERATORS = [
  NumberOperator.EQUALS,
  NumberOperator.BETWEEN,
  NumberOperator.LESS,
  NumberOperator.GREATER,
];

interface Attribute {
  property: EventProperty;
  operator: StringOperator | NumberOperator;
  operands: string[];
}

interface FormStep {
  name: string;
  event: string;
  attributes: Attribute[];
}

const EMPTY_STEP_NAME = 'Unnamed step';
const EMPTY_PROPERTY: EventProperty = {
  property: '',
  type: '',
};
@Component({
  selector: 'app-funnel-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    MatIcon,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
  ],
  templateUrl: './funnel-form.component.html',
  styleUrl: './funnel-form.component.scss',
})
export class FunnelFormComponent {
  form = this.getNewForm();
  eventOptions: string[] = [];
  eventsProperties: Record<string, EventProperty[]> = {};
  emptyProperty = EMPTY_PROPERTY;

  numberOperator = NumberOperator;
  numberOperators = NUMBER_OPERATORS;
  stringOperator = StringOperator;
  stringOperators = STRING_OPERATORS;

  constructor(private fb: FormBuilder, private es: EventsService) {
    this.es.getEvents().subscribe((events) => (this.eventOptions = events));
    this.es
      .getEventsProperties()
      .subscribe(
        (eventProperties) => (this.eventsProperties = eventProperties)
      );
  }

  getNewForm() {
    return this.fb.array([this.getNewStep()]);
  }

  getNewStep() {
    return this.fb.group({
      name: EMPTY_STEP_NAME,
      event: '',
      attributes: this.fb.array(
        [] as ReturnType<typeof this.getEmptyAttribute>[]
      ),
    });
  }

  addStep() {
    this.form.push(this.getNewStep());
  }

  deleteStep(stepIndex: number) {
    this.form.removeAt(stepIndex);
  }

  discardSteps() {
    this.form.clear();
    this.addStep();
  }

  changeStepName(stepIndex: number, name: string) {
    const stepControl = this.getStepControl(stepIndex);
    // TODO: should be changed only first time ?
    if (stepControl.value.name === EMPTY_STEP_NAME) {
      stepControl.patchValue({ name });
    }
  }

  getStepControl(stepIndex: number) {
    return this.form.controls[stepIndex];
  }

  getAttributeControl(stepIndex: number, attributeIndex: number) {
    return this.form.controls[stepIndex].controls.attributes.controls[
      attributeIndex
    ];
  }

  onSubmit() {
    console.log('%c SUBMIT', 'background-color: skyblue', {
      value: this.form.value,
    });
  }

  // attributes
  getEmptyAttribute() {
    return this.fb.group({
      property: EMPTY_PROPERTY,
      operator: '',
      operands: this.fb.array([] as Attribute['operands']),
    });
  }

  addEmptyAttribute(stepIndex: number) {
    const stepControl = this.getStepControl(stepIndex);
    stepControl.controls.attributes?.push(this.getEmptyAttribute());
  }

  getAttributeOperators(property: EventProperty | null) {
    return property?.type === 'number' ? NUMBER_OPERATORS : STRING_OPERATORS;
  }

  getNewOperands(operator: StringOperator | NumberOperator) {
    return operator === NumberOperator.BETWEEN ? ['', ''] : [''];
  }

  private patchOperatorAndOperands(
    attributeControl: any,
    operator: NumberOperator | StringOperator
  ) {
    attributeControl.patchValue({
      operator: operator,
    });
    attributeControl.controls.operands.clear();
    this.getNewOperands(operator).forEach((operand) => {
      console.log('%c ITTERATE OPERANDS', 'background-color: orange', {
        operator,
        operand,
      });
      attributeControl.controls.operands.push(new FormControl(operand));
    });
  }

  onChangeProperty(
    stepIndex: number,
    attributeIndex: number,
    property: EventProperty
  ) {
    if (!!property) {
      const attributeControl = this.getAttributeControl(
        stepIndex,
        attributeIndex
      );
      const operator = this.getAttributeOperators(property)[0];
      this.patchOperatorAndOperands(attributeControl, operator);
    }
    console.log('%c Property', 'background-color: skyblue', { property });
  }

  onChangeOperator(
    stepIndex: number,
    attributeIndex: number,
    operator: StringOperator | NumberOperator
  ) {
    if (!!operator) {
      const attributeControl = this.getAttributeControl(
        stepIndex,
        attributeIndex
      );
      this.patchOperatorAndOperands(attributeControl, operator);
    }
    console.log('%c Operator', 'background-color: skyblue', { operator });
  }
}
