export interface EventProperty {
  type: string;
  property: string;
}

export interface Event {
  type: string;
  properties: EventProperty[];
}

export interface EventApiResponse {
  events: Event[];
}
