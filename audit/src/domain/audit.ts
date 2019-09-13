// Define the interface for the audit repo

export interface AuditLogItem {
  subject: string;
  verb: string;
  entity: string;
}

export interface AuditRepository {
  putLog(item: AuditLogItem): Promise<boolean>;
}
