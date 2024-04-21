import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { EventsService } from './../../services/events/events.service';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EventProperty } from '../../services/events/types';

enum StringOperand {
  EQUALS = 'equals',
  NOT_EQUAL = 'does not equals',
  CONTAINS = 'contains',
  NOT_CONTAIN = 'does not contain',
}

enum NumberOperand {
  EQUALS = 'equals to',
  BETWEEN = 'in between',
  LESS = 'less than',
  GREATER = 'greater than',
}

interface Attribute {
  property: EventProperty;
  operand: StringOperand | NumberOperand;
  operators: string[];
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

  onSubmit() {
    console.log('%c SUBMIT', 'background-color: skyblue', {
      value: this.form.value,
    });
  }

  // attributes
  getEmptyAttribute() {
    return this.fb.group({
      property: EMPTY_PROPERTY,
      operand: '',
      operators: this.fb.array([] as Attribute['operators']),
    });
  }

  addEmptyAttribute(stepIndex: number) {
    const stepControl = this.getStepControl(stepIndex);
    stepControl.controls.attributes?.push(this.getEmptyAttribute());
  }

  onChangeProperty(
    stepIndex: number,
    attributeIndex: number,
    property: string
  ) {
    console.log('%c Property', 'background-color: skyblue', { property });
  }
}
