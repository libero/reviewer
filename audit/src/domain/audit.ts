import { AuditRepository, AuditLogItem } from './types';

export class AuditController {
  public constructor(private readonly auditRepo: AuditRepository) {}

  public async recordAudit(item: AuditLogItem): Promise<boolean> {
    return this.auditRepo.putLog(item);
  }
}

/**
* Thoughts:
* - How to do the thing?
* - How to do the other thing? :thinking-face:
*/