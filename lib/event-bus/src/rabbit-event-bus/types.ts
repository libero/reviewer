import { EventType, Event } from '../event-bus';

export interface StateChange<M extends object> {
  newState: 'CONNECTED' | 'NOT_CONNECTED' | 'NEW_MESSAGE';
  message?: M; // Make this some type
}

export interface MessageWrapper<T> {
  event: T;
  meta: {
    attempts: number;
    retries: number;
    failures: number;
  };
}

export interface Subscription<P extends object> {
  eventType: EventType;
  handler: (ev: Event<P>) => Promise<boolean>;
}
