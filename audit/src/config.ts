import { Config as KnexConfig } from 'knex';

const knexConfig: KnexConfig = {
  client: 'pg',
  // In production we should use postgres pools.
  connection: {
    host: 'localhost',
    user: 'postgres',
    database: 'reviewer_audit',
    password: 'postgres',
  },
};
export const  serviceConfig = {
  knex: knexConfig,
};

export default serviceConfig;
