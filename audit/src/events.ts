import { EventType } from '@libero/event-bus';

export interface ServiceStartedPayload {
  name: string;
  type: string;
}

export const serviceStartedIdentifier: EventType = 'libero:infra:audit:ServiceStarted';

export interface UserLoggedInPayload {
  name: string;
  userId: string;
  email: string;
  timestamp: Date;
}

export const userLoggedInIdentifier: EventType = 'libero:audit:user:LoggedIn';
