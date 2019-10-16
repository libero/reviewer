import { EventType, Event } from '../event-bus';

export type ConnectedState = 'CONNECTED' | 'NOT_CONNECTED' | 'NEW_MESSAGE';

export interface StateChange {
  newState: ConnectedState;
  message?: string; // Make this some type
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
