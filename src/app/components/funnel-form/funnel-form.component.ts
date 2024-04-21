import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  EMPTY_PROPERTY,
  EMPTY_STEP_NAME,
  NUMBER_OPERATORS,
  STRING_OPERATORS,
} from '../../constants';
import {
  Attribute,
  EventProperty,
  NumberOperator,
  StringOperator,
} from '../../models';
import { getAttributeOperators, getNewOperands } from '../../utils';
import { EventsService } from './../../services';

@Component({
  selector: 'app-funnel-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    MatIcon,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './funnel-form.component.html',
  styleUrl: './funnel-form.component.scss',
})
export class FunnelFormComponent {
  form = this.fb.array([this.getNewStep()]);
  eventOptions: string[] = [];
  eventsProperties: Record<string, EventProperty[]> = {};
  emptyProperty = EMPTY_PROPERTY;

  numberOperator = NumberOperator;
  numberOperators = NUMBER_OPERATORS;
  stringOperator = StringOperator;
  stringOperators = STRING_OPERATORS;
  getAttributeOperators = getAttributeOperators;

  constructor(private fb: FormBuilder, private es: EventsService) {
    this.es.getEvents().subscribe((events) => (this.eventOptions = events));
    this.es
      .getEventsProperties()
      .subscribe(
        (eventProperties) => (this.eventsProperties = eventProperties)
      );
  }

  onSubmit() {
    console.log('%c SUBMIT', 'background-color: skyblue', {
      value: this.form.value,
    });
  }

  // STEPS METHODS
  getStepControl(stepIndex: number) {
    return this.form.controls[stepIndex];
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

  // ATTRIBUTES METHODS
  getAttributeControl(stepIndex: number, attributeIndex: number) {
    return this.form.controls[stepIndex].controls.attributes.controls[
      attributeIndex
    ];
  }

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

  private patchOperatorAndOperands(
    attributeControl: any,
    operator: NumberOperator | StringOperator
  ) {
    attributeControl.patchValue({
      operator: operator,
    });
    attributeControl.controls.operands.clear();
    getNewOperands(operator).forEach((operand) => {
      console.log(
        '%c patchOperatorAndOperands ITERATE OPERANDS',
        'background-color: orange',
        {
          operator,
          operand,
        }
      );
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
      const operator = getAttributeOperators(property)[0];
      this.patchOperatorAndOperands(attributeControl, operator);
    }
    console.log('%c onChangeProperty', 'background-color: skyblue', {
      property,
    });
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
    console.log('%c onChangeOperator', 'background-color: skyblue', {
      operator,
    });
  }
}
