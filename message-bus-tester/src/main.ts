import * as express from "express";
import { Request, Response } from "express";
import { InfraLogger as logger } from './logger';
import { Event, EventIdentifier } from './message-queue';
import { RabbitMessageQueue } from './rabbit-message-queue';

type TestEventPayload = {
  x: number;
  y: number;
};

const init_mq = async () => {
  const events: EventIdentifier = {
    kind: "something_else",
    namespace: "service_01",
  };

  const mq = await (new RabbitMessageQueue()).init([events, events]);
  logger.info("messageQueueStarted");

  mq.subscribe<TestEventPayload>(events, async (event) => {
    logger.info(event);
    return true;
  });

};

const main = () => {
  init_mq();
  const app = express();
  app.use("/", (req: Request, res: Response, next) => {
    // Maybe this should be trace level logging
    logger.info(`${req.method} ${req.path}`, {});
    next();
  });

  app.get("/health", (req: Request, res: Response) => {
    logger.info("/healthcheck");
    res.json({ ok: true })
  });

  return app;
};

main().listen(3002, () => logger.info("applicationStartup"));
