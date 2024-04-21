import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { EventsService } from './../../services/events/events.service';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

const EMPTY_EVENT = { event: '' };

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
    return this.fb.array([this.fb.group(EMPTY_EVENT)]);
  }

  getNewEvent() {
    return this.fb.group(EMPTY_EVENT);
  }

  addEvent() {
    this.form.push(this.getNewEvent());
  }

  deleteEvent(eventIndex: number) {
    this.form.removeAt(eventIndex);
  }

  discardFilters() {
    this.form.clear();
    this.addEvent();
  }

  onSubmit() {
    console.log('%c SUBMIT', 'background-color: skyblue', {
      value: this.form.value,
    });
  }
}
