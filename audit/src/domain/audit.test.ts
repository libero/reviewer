import { AuditController } from './audit';

describe('Audit controller', () => {
    it('should add a log item', () => {
        const repo = {
            putLog: jest.fn(),
        };
        const controller = new AuditController(repo);
        const item = {
            id: 'id',
            subject: 'subject',
            verb: 'verb',
            entity: 'entity',
        };

        controller.recordAudit(item);
        expect(repo.putLog).toHaveBeenCalledTimes(1);
        expect(repo.putLog).toHaveBeenCalledWith({
            id: 'id',
            subject: 'subject',
            verb: 'verb',
            entity: 'entity',
        });
    });
});
