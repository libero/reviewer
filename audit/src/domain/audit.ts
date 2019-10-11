import { AuditRepository, AuditLogItem } from './types';

export class AuditController {
  public constructor(private readonly auditRepo: AuditRepository) {}

  public async recordAudit(item: AuditLogItem): Promise<boolean> {
    return this.auditRepo.putLog(item);
  }
}
