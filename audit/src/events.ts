import { Event, EventType } from "@libero/event-bus";

export type ServiceStartedPayload = {
  name: string;
  type: string;
};

export const serviceStartedIdentifier: EventType = {
  kind: "ServiceStarted",
  namespace: "infra-global"
};

export type UserLoggedInPayload = {
  name: string;
  userId: string;
  email: string;
  timestamp: Date;
};

export const userLoggedInIdentifier: EventType = {
  kind: "UserLoggedIn",
  namespace: "user-audit",
};
