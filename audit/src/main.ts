// Startup the audit service
import { InfraLogger as logger } from "./logger";
import * as express from "express";
import { Express, Request, Response } from "express";
import { HealthCheck } from "./endpoints";
import { Event, EventBus, RabbitEventBus } from "@libero/event-bus";

import { ServiceStartedPayload, serviceStartedIdentifier } from "./events";
import { ServiceStartedHandler } from "./handlers";

const setupEventBus = async (eventBus: EventBus) => {
  await eventBus.init([serviceStartedIdentifier], "audit");

  // setup subscribers

  eventBus.subscribe<ServiceStartedPayload>(
    serviceStartedIdentifier,
    ServiceStartedHandler(undefined)
  );

  // publish "ServiceStarted"
  const event: Event<ServiceStartedPayload> = {
    id: "some-wevent-id",
    created: new Date(),
    payload: {
      type: "support",
      name: "audit"
    },
    ...serviceStartedIdentifier
  };

  await eventBus.publish(event);
  return eventBus;
};

const setupWebServer = (server: Express) => {
  server.use("/", (req: Request, res: Response, next: Function) => {
    logger.info(`${req.method} ${req.path}`, {});
    next();
  });

  server.get("/health", HealthCheck());

  return server;
};

const main = async () => {
  logger.info("serviceInit");

  const eventBus = await setupEventBus(new RabbitEventBus());
  // Create message bus instance

  // Create express instance
  const app = setupWebServer(express());

  // express.listen();
};
