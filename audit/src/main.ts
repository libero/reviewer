// Startup the audit service
import { InfraLogger as logger } from './logger';
import * as express from 'express';
import { Express, Request, Response } from 'express';
import { HealthCheck } from './endpoints';
import { EventConfig, Event, EventBus, RabbitEventBus } from '@libero/event-bus';
import {
  ServiceStartedPayload,
  UserLoggedInPayload,
  LiberoEventType } from '@libero/libero-events';
import { ServiceStartedHandler, UserLoggedInHandler } from './handlers';
import { AuditController } from './domain/audit';
import { KnexAuditRepository } from './repo/audit';
import { v4 } from 'uuid';
import Config from './config';

import * as Knex from 'knex';

const auditController = new AuditController(new KnexAuditRepository(Knex(Config.knex)));
const auditServiceName = v4();

const setupAuditEventBus = async (freshEventBus: EventBus) => {
  const eventBus = await freshEventBus.init(
    [
      LiberoEventType.serviceStartedIdentifier,
      LiberoEventType.userLoggedInIdentifier,
    ],
    'audit',
  );

  // setup subscribers
  eventBus.subscribe<ServiceStartedPayload>(
    LiberoEventType.serviceStartedIdentifier,
    ServiceStartedHandler(auditController),
  );

  eventBus.subscribe<UserLoggedInPayload>(
    LiberoEventType.userLoggedInIdentifier,
    UserLoggedInHandler(auditController),
  );

  // publish "ServiceStarted"
  const event: Event<ServiceStartedPayload> = {
    id: v4(),
    created: new Date(),
    payload: {
      type: 'support/audit',
      name: auditServiceName,
    },
    eventType: LiberoEventType.serviceStartedIdentifier,
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

  const eventBus = await setupAuditEventBus(new RabbitEventBus({url: `amqp://${ Config.event.url }`}));
  // TODO: Eventually turn this into a factory method on the EventBus abstract class so that the instance of
  // the message bus can be created from config.
  // Create message bus instance

  // Create express instance
  const app = setupWebServer(express());
  return app;
};

main().then(app =>
  app.listen(Config.port, () => {
    logger.info('serviceStarted');
  }),
);
