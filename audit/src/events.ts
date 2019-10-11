import { Event, EventType } from "@libero/event-bus";

export type ServiceStartedPayload = {
  name: string;
  type: string;
};

export const serviceStartedIdentifier: EventType = "libero:infra:audit:ServiceStarted";

export type UserLoggedInPayload = {
  name: string;
  userId: string;
  email: string;
  timestamp: Date;
};

export const userLoggedInIdentifier: EventType = "libero:audit:user:LoggedIn";