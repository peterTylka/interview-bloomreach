import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { EventsService } from './../../services/events/events.service';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

const EMPTY_STEP_NAME = 'Unnamed step';
const EMPTY_STEP = { name: EMPTY_STEP_NAME, event: '' };

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
  eventOptions = this.es.getEvents();

  constructor(private fb: FormBuilder, private es: EventsService) {}

  getNewForm() {
    return this.fb.array([this.fb.group(EMPTY_STEP)]);
  }

  getNewStep() {
    return this.fb.group(EMPTY_STEP);
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
    const stepControl = this.form.controls[stepIndex];
    // TODO: should be changed only first time ?
    if (stepControl.value.name === EMPTY_STEP_NAME) {
      stepControl.patchValue({ name });
    }
  }

  onSubmit() {
    console.log('%c SUBMIT', 'background-color: skyblue', {
      value: this.form.value,
    });
  }
}
