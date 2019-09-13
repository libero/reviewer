// Event handlers - returns
import { Event } from '@libero/event-bus';
import { ServiceStartedPayload } from '../events';
import { InfraLogger as logger } from '../logger';

export type EventHandler<T extends object>= (...args) => (ev: Event<T>) => Promise<boolean>;

export const ServiceStartedHandler = (auditRepo: unknown) => async (ev: Event<ServiceStartedPayload>) => {
  // Ack the message without doing anything
  logger.info("serviceStartedRecieved", ev.payload);
  return true;
}
