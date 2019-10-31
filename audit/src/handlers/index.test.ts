import { Event } from '@libero/event-bus';
import { UserLoggedInHandler } from './index';
import { AuditController } from '../domain/audit';
import { UserLoggedInPayload, LiberoEventType } from '@libero/libero-events';

jest.mock('../logger');

beforeEach(jest.resetAllMocks);

const recordAudit = jest.fn();
const controller = {
    auditRepo: null,
    recordAudit,
} as unknown as AuditController;

beforeEach(jest.resetAllMocks);

describe('UserLoggedInHandler', () => {
    it('records audit item', () => {
        const handler = UserLoggedInHandler(controller);
        const event: Event<UserLoggedInPayload> = {
            id: 'event-started-id',
            created: new Date(),
            payload: {
              name: 'name',
              userId: 'userId',
              email: 'email',
              timestamp: new Date(),
              result: 'authorized',
            },
            context: {
              source: 'source',
            },
            eventType: LiberoEventType.userLoggedInIdentifier,
        };

        handler(event);

        const auditItem = recordAudit.mock.calls[0][0];

        expect(recordAudit).toHaveBeenCalledTimes(1);
        expect(auditItem.entity).toBe('user:userId');
        expect(auditItem.action).toBe('LOGGED_IN');
        expect(auditItem.object).toBe('source');
        expect(auditItem.result).toBe('authorized');
    });
});
