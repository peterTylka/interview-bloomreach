import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { EVENTS } from '../../../../task/events';
import { EventApiResponse } from './types';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  apiResponse: any = null;

  constructor(private http: HttpClient) {}

  getEventsFromApi() {
    return this.http.get<EventApiResponse>(
      'https://br-fe-assignment.github.io/customer-events/events.json'
    );
  }

  // TODO: get from API
  getEvents() {
    return this.getEventsFromApi().pipe(
      map((response) => {
        const events = response.events.map((event) => event.type);
        console.log('%c events', 'background-color: skyblue', { events });
        return events;
      })
    );
  }

  getEventAttributes(eventType: string) {
    return EVENTS?.events?.find((event) => event.type === eventType)
      ?.properties;
  }
}
