// Startup the audit service
import { InfraLogger as logger } from './logger';
import * as express from 'express';
import { Express, Request, Response, RequestHandler } from 'express';
import { HealthCheck } from './endpoints';
import { Event, EventBus, RabbitEventBus } from '@libero/event-bus';

import { ServiceStartedPayload, serviceStartedIdentifier } from './events';
import { ServiceStartedHandler } from './handlers';
import { AuditController } from './domain/audit';
import { KnexAuditRepository } from './repo/audit';
import { v4 } from 'uuid';
import Config from './config';

import * as Knex from 'knex';

const auditController = new AuditController(new KnexAuditRepository(Knex(Config.knex)));
const auditServiceName = v4();

const setupEventBus = async (freshEventBus: EventBus) => {
  const eventBus = await freshEventBus.init(
    [serviceStartedIdentifier],
    'audit',
  );

  // setup subscribers

  eventBus.subscribe<ServiceStartedPayload>(
    serviceStartedIdentifier,
    ServiceStartedHandler(auditController),
  );

  // publish "ServiceStarted"
  const event: Event<ServiceStartedPayload> = {
    id: 'some-wevent-id',
    created: new Date(),
    payload: {
      type: 'support/audit',
      name: auditServiceName,
    },
    eventType: serviceStartedIdentifier,
  };

  await eventBus.publish(event).then(() => {
    logger.debug('emittedServiceStarted');
  });
  return eventBus;
};

const setupWebServer = (server: Express) => {
  server.use('/', (req: Request, res: Response, next: () => void) => {
    logger.info(`${req.method} ${req.path}`, {});
    next();
  });

  server.get('/health', HealthCheck());

  return server;
};

const main = async () => {
  logger.info('serviceInit');

  const eventBus = await setupEventBus(new RabbitEventBus({url: 'amqp://rabbitmq'}));
  // TODO: Eventually turn this into a factory method on the EventBus abstract class so that the instance of
  // the message bus can be created from config.
  // Create message bus instance

  // Create express instance
  const app = setupWebServer(express());
  return app;
};

main().then(app =>
  app.listen(3004, () => {
    logger.info('serviceStarted');
  }),
);
