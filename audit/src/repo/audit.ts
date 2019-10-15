// Use knex to connect to a database and write stuff to the table
import { AuditRepository, AuditLogItem } from '../domain/types';
import { InfraLogger as logger } from '../logger';
import * as Knex from 'knex';

export class KnexAuditRepository implements AuditRepository {
  public constructor(private readonly knex: Knex<{}, unknown[]>) { }

  public async putLog( item: AuditLogItem ): Promise<boolean> {

    logger.debug('auditWritten', item.id);

    await this.knex(this.TABLE_NAME).insert<AuditLogItem>(item);

    return true;
  }
}
