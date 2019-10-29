import { Event } from '../event-bus';

export type ConnectedState = 'CONNECTED' | 'NOT_CONNECTED';

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
  eventType: string;
  handler: (ev: Event<P>) => Promise<boolean>;
}
