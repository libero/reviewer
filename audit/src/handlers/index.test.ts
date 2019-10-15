import { Event } from '@libero/event-bus';
import { ServiceStartedHandler } from './index';
import { AuditController } from '../domain/audit';
import { ServiceStartedPayload, serviceStartedIdentifier } from '../events';

jest.mock('../logger');

describe('ServiceStartedHandler', () => {
    it('records audit item', () => {
        const recordAudit = jest.fn();
        const controller = {
            auditRepo: null,
            recordAudit,
        } as unknown as AuditController;
        const handler = ServiceStartedHandler(controller);
        const event: Event<ServiceStartedPayload> = {
            id: 'event-started-id',
            created: new Date(),
            payload: {
              type: 'support/audit',
              name: 'servicename',
            },
            eventType: serviceStartedIdentifier,
        };

        handler(event);

        const auditItem = recordAudit.mock.calls[0][0];
        expect(recordAudit).toHaveBeenCalledTimes(1);
        expect(auditItem.entity).toBe('NONE');
        expect(auditItem.verb).toBe('STARTED');
        expect(auditItem.subject).toBe('servicename-support/audit');
    });
});
