// Event handlers - returns
import { Event } from '@libero/event-bus';
import { UserLoggedInPayload } from '@libero/libero-events';
import { InfraLogger as logger } from '../logger';
import { AuditController } from '../domain/audit';
import { AuditLogItem } from '../domain/types';
import { v4 } from 'uuid';

export type EventHandler<T extends object> = (
  ...args
) => (ev: Event<T>) => Promise<boolean>;

export const UserLoggedInHandler = (auditDomain: AuditController) => async (
  ev: Event<UserLoggedInPayload>,
) => {
  const auditItem: AuditLogItem = {
    entity: `user:${ev.payload.userId}`,
    action: 'LOGGED_IN',
    object: 'application',
  };

  logger.info('userLoggedInReceived', ev.payload);
  return await auditDomain.recordAudit(auditItem);
};
