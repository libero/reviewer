import { UserRepository } from '../../packages/user/user.repository';
import { Option, None } from 'funfix';
import * as Knex from 'knex';

export class KnexUserRepository implements UserRepository {
  private readonly USER_TABLE = 'users';
  private readonly IDENTITY_TABLE = 'identity';

  public constructor(private readonly knex: Knex<{}, unknown>) {}

  public async initSchema() {
    await this.knex.schema.createTable(
      this.IDENTITY_TABLE,
      (table: Knex.CreateTableBuilder) => {
        table.uuid('id');
        table.uuid('user_id');
        table.timestamp('created');
        table.timestamp('updated');
        table.string('text');
        table.string('identifier');
        table.string('display_name');
        table.string('email');
        table.json('meta');

      },
    ).then(async () => {
      return await this.knex.schema.createTable(
        this.USER_TABLE,
        (table: Knex.CreateTableBuilder) => {
          table.uuid('id');
          table.string('default_identity');
          table.timestamp('created');
          table.timestamp('updated');
        },
      );

    });
  }
}
