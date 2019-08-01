import {
  UserRepository,
  IUser,
  Identity,
  JustUser,
} from '../../packages/user/user.repository';
import { Option, None } from 'funfix';
import * as Knex from 'knex';

export class KnexUserRepository implements UserRepository {
  private readonly USER_TABLE = 'users';
  private readonly IDENTITY_TABLE = 'identity';

  public constructor(private readonly knex: Knex<{}, unknown>) {}

  public async initSchema() {
    await this.knex.schema
      .createTable(this.IDENTITY_TABLE, (table: Knex.CreateTableBuilder) => {
        table.uuid('id');
        table.uuid('user_id');
        table.timestamp('created');
        table.timestamp('updated');
        table.string('text');
        table.string('identifier');
        table.string('display_name');
        table.string('email');
        table.json('meta');
      })
      .then(async () => {
        return await this.knex.schema.createTable(
          this.USER_TABLE,
          (table: Knex.CreateTableBuilder) => {
            table.uuid('id');
            table.string('default_identity');
            table.timestamp('created');
            table.timestamp('updated');
            table.string('defaultIdentity');
          },
        );
      });
  }

  public async insert(user: IUser): Promise<IUser> {
    // This should handle errors in the db by automatically rolling back the transaction
    await this.knex.transaction(async (trx: Knex.Transaction<{}, unknown>) => {
      // Split the user stuff from the identity stuff
      const { identities: optIdentities, ...justUser } = user;

      await optIdentities
        .map(async (identities: Identity[]) => {
          const identitiesForUser = identities.map(
            (ident: Identity): Identity => {
              return { ...ident, user_id: justUser.id };
            },
          );

          return trx(this.IDENTITY_TABLE).insert<Identity>(identitiesForUser);
        })
        .getOrElse(undefined);

      await trx(this.USER_TABLE).insert({
        id: justUser.id,
        created: justUser.created,
        updated: justUser.updated.getOrElse(null),
        defaultIdentity: justUser.defaultIdentity.getOrElse(null),
      });
    });

    return user;
  }

  public async update(user: IUser): Promise<IUser> {
    // Do we want to diff? How do we handle this?
    return user;
  }

  public async remove(userId: string): Promise<void> {
    // delet this
  }

  public async selectById(userId: string): Promise<Option<IUser>> {
    const result = await this.knex(this.USER_TABLE)
      .where({ [`${this.USER_TABLE}.id`]: userId })
      // TODO: Reassign the ambiguous field names in the join so it doesn't get muddled up
      .leftJoin(
        this.IDENTITY_TABLE,
        `${this.USER_TABLE}.id`,
        `${this.IDENTITY_TABLE}.user_id`,
      ).select(
        'users.id as user_id',
        'users.created as user_created',
        'users.updated as user_updated',
        'users.defaultIdentity as user_defaultIdentity',

        'identity.id as identity_id',
        'identity.created as identity_created',
        'identity.updated as identity_updated',
        'identity.display_name as identity_display_name',
        'identity.email as identity_email',
        'identity.meta as identity_meta',
      );

    const userInfo = Option.of(result[0]).map(
      (row): JustUser => {
        return {
          id: row.user_id,
          created: row.user_created,
          updated: Option.of(row.user_updated),
          defaultIdentity: Option.of(row.user_defaultIdentity),
        };
      },
    );

    const identities = Option.of(result.map((row): Identity => ({
      id: row.identity_id,
      created: row.identity_created,
      updated: row.identity_updated,
      user_id: row.user_id,
      display_name: row.identity_display_name,
      email: row.identity_email,
      meta: row.identity_meta,
    })));

    return userInfo.map(
      (user: JustUser): IUser => {
        return {
          ...user,
          identities,
        };
      },
    );
  }

  public async selectByProfileId(profileId: string): Promise<Option<IUser>> {
    await this.knex(this.IDENTITY_TABLE)
      .where({ identifier: profileId })
      .rightJoin(
        this.USER_TABLE,
        `${this.IDENTITY_TABLE}.user_id`,
        `${this.USER_TABLE}.id`,
      );
    return None;
  }

  public async selectAll(): Promise<IUser[]> {
    return [];
  }
}
