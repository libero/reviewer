// Use knex to connect to a database and write stuff to the table
import { AuditRepository, AuditLogItem } from '../domain/types';
import { InfraLogger as logger } from '../logger';
import * as Knex from 'knex';

export class KnexAuditRepository implements AuditRepository {
  private TABLE_NAME = "audit";

  public constructor(private readonly knex: Knex<{}, unknown[]>) {
  	this.initTables();
  }

  private async initTables(): Promise<void> {
    // this will eventually be replaced with migrations

    await this.knex.schema.createTable(this.TABLE_NAME, function(table) {
    	table.string('id');
    	table.string('subject');
    	table.string('verb');
    	table.string('entity');
    })

  }

  public async putLog( item: AuditLogItem ): Promise<boolean> {

    logger.debug("auditWritten", item.id);

    await this.knex(this.TABLE_NAME).insert<AuditLogItem>(item);

    return true;
  }
}
