import { Config as KnexConfig } from 'knex';

const knexConfig: KnexConfig = {
  client: 'pg',
  // In production we should use postgres pools.
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    database: 'reviewer_audit',
    password: process.env.DB_PASSWORD,
  },
};
export const  serviceConfig = {
  eventBus: {
    url: process.env.RABBITMQ_URL,
  },
  port: process.env.AUDIT_PORT || 3004,
  knex: knexConfig,
};

export default serviceConfig;
