import {Config as KnexConfig } from 'knex';

const knexConfig: KnexConfig = {
  dialect: "pg",
  // In production we should use postgres pools.
  connection: {
    host: "postgres",
    user: "postgres",
    database: "reviewer_audit",
    password: "postgres"
  }
}
export const  serviceConfig = {
  knex: knexConfig,
};

export default serviceConfig;
