import { Event, EventIdentifier } from '@libero/event-bus';

export interface ServiceStartedPayload {
  name: string;
  type: string;
}

export const serviceStartedIdentifier: EventIdentifier = {
  kind: 'ServiceStarted',
  namespace: 'infra-global',
};

export interface UserLoggedInPayload {
  name: string;
  userId: string;
  email: string;
  timestamp: Date;
}

export const userLoggedInIdentifier: EventIdentifier = {
  kind: 'UserLoggedIn',
  namespace: 'user-audit',
};
