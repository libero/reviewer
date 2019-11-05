// Event handlers - returns
import { Event } from "@libero/event-bus";
import { UserLoggedInPayload } from "@libero/event-types";
import { InfraLogger as logger } from "../logger";
import { AuditController } from "../domain/audit";
import { AuditLogItem } from "../domain/types";

export type EventHandler<T extends object> = (
  ...args
) => (ev: Event<T>) => Promise<boolean>;

export const UserLoggedInHandler = (auditDomain: AuditController) => async (
  event: Event<UserLoggedInPayload>
) => {
  const auditItem: AuditLogItem = {
    entity: `user:${event.payload.userId}`,
    action: "LOGGED_IN",
    object: (event.context as { source: string }).source || "",
    result: event.payload.result
  };

  logger.info("userLoggedInReceived", event.payload);
  return await auditDomain.recordAudit(auditItem);
};
