import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { EventApiResponse } from './types';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient) {}

  getEventsFromApi() {
    return this.http.get<EventApiResponse>(
      'https://br-fe-assignment.github.io/customer-events/events.json'
    );
  }

  getEvents() {
    return this.getEventsFromApi().pipe(
      map((response) => {
        const events = response.events.map((event) => event.type);
        console.log('%c events', 'background-color: skyblue', { events });
        return events;
      })
    );
  }

  getEventsProperties() {
    return this.getEventsFromApi().pipe(
      map((response) => {
        const propertiesObj = response.events.reduce((acc, currentValue) => {
          return { ...acc, [currentValue.type]: currentValue.properties };
        }, {});
        console.log('%c properties', 'background-color: skyblue', {
          propertiesObj,
        });
        return propertiesObj;
      })
    );
  }
}
