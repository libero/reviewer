import { Config as KnexConfig } from 'knex';

const knexConfig: KnexConfig = {
  client: 'pg',
  // In production we should use postgres pools.
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
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
