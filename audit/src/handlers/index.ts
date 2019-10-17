// Event handlers - returns
import { Event } from '@libero/event-bus';
import { ServiceStartedPayload, UserLoggedInPayload } from '../events';
import { InfraLogger as logger } from '../logger';
import { AuditController } from '../domain/audit';
import { AuditLogItem } from '../domain/types';
import { v4 } from 'uuid';

export type EventHandler<T extends object> = (
  ...args
) => (ev: Event<T>) => Promise<boolean>;

export const ServiceStartedHandler = (auditDomain: AuditController) => async (
  ev: Event<ServiceStartedPayload>,
) => {
  // Transform the event payload into an auditable event
  const auditItem: AuditLogItem = {
    id: v4(),
    subject: `${ev.payload.name}-${ev.payload.type}`,
    verb: 'STARTED',
    entity: 'NONE',
  };

  logger.info('serviceStartedReceived', ev.payload);
  return await auditDomain.recordAudit(auditItem);
};

export const UserLoggedInHandler = (auditDomain: AuditController) => async (
  ev: Event<UserLoggedInPayload>,
) => {
  const auditItem: AuditLogItem = {
    id: v4(),
    subject: `${ev.payload.name}-${ev.payload.email}`,
    verb: 'LOGGED_IN',
    entity: ev.payload.userId,
  };

  logger.info('userLoggedInReceived', ev.payload);
  return await auditDomain.recordAudit(auditItem);
};
