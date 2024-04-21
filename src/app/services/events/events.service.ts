import { Injectable } from '@angular/core';
import { EVENTS } from '../../../../task/events';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor() { }

  // TODO: get from API
  getEvents() {
    const events = EVENTS?.events?.map(event => event.type);
    console.log('%c events', 'background-color: skyblue', {events});
    return events
  }

  getEventAttributes(eventType: string) {
    return EVENTS?.events?.find(event => event.type === eventType)?.properties
  }
}
