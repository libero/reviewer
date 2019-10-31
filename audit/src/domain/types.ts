export interface AuditLogItem {
  entity: string;
  action: string;
  object: string;
  result?: unknown;
}

export interface AuditRepository {
  putLog(item: AuditLogItem): Promise<boolean>;
}
