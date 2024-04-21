import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { EventsService } from './../../services/events/events.service';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-funnel-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatSelectModule],
  templateUrl: './funnel-form.component.html',
  styleUrl: './funnel-form.component.scss',
})
export class FunnelFormComponent {
  form = this.fb.array([
    this.fb.group({
      event: '',
    }),
  ]);
  eventOptions = this.es.getEvents();

  constructor(private fb: FormBuilder, private es: EventsService) {}

  addEvent() {
    this.form.controls.push(this.fb.group({ event: '' }));
  }

  onSubmit() {
    console.log('%c SUBMIT', 'background-color: skyblue', {
      value: this.form,
    });
  }
}
