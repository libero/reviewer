import { Config as KnexConfig } from 'knex';
import { EventConfig } from '@libero/event-bus';

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

const eventConfig: EventConfig = {
  url: process.env.RABBITMQ_URL || 'localhost',
};

export const  serviceConfig = {
  port: process.env.AUDIT_PORT || 3004,
  knex: knexConfig,
  event: eventConfig,
};

export default serviceConfig;
