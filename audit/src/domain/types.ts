export interface AuditLogItem {
  id: string;
  subject: string;
  verb: string;
  entity: string;
}

export interface AuditRepository {
  putLog(item: AuditLogItem): Promise<boolean>;
}
