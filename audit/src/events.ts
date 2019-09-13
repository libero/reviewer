import { Event, EventIdentifier} from '@libero/event-bus';

export type ServiceStartedPayload = {
  name: string;
  type: string;
}

export const serviceStartedIdentifier: EventIdentifier = {
  kind: "ServiceStarted",
  namespace: "infra-global"
}
