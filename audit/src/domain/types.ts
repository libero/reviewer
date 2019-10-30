export interface AuditLogItem {
  entity: string;
  action: string;
  object: string;
}

export interface AuditRepository {
  putLog(item: AuditLogItem): Promise<boolean>;
}
