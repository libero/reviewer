import * as express from "express";
import { Request, Response } from "express";
import { InfraLogger as logger } from './logger';
import { Event, EventIdentifier } from './message-queue';
import { RabbitMessageQueue } from './rabbit-message-queue';
import { MockMessageQueue } from './mock-message-queue';

type TestEventPayload = {
  x: number;
  y: number;
};

const init_mq = async () => {
  const test_event_def: EventIdentifier = {
    kind: "something_else",
    namespace: "service_01",
  };

  // Mock bus
  const mock_mq = await (new MockMessageQueue()).init([test_event_def, test_event_def], "message-bus-test");
  logger.info("messageQueueStarted");

  mock_mq.subscribe<TestEventPayload>(test_event_def, async (event) => {
    logger.info('mockEventRecieved', event);
    return true;
  });

  setTimeout(() => {
    const event: Event<TestEventPayload> = {
      id: 'some-wevent-id',
      created: new Date(),
      payload: {
        x: 10,
        y: 20,
      },
      ...test_event_def
    }

    mock_mq.publish(event);
  }, 10000)

  // Rabbit bus
  const rabbitmq_mq = await (new RabbitMessageQueue()).init([test_event_def, test_event_def], "message-bus-test");
  logger.info("messageQueueStarted");

  rabbitmq_mq.subscribe<TestEventPayload>(test_event_def, async (event) => {
    logger.info('rabbitEventRecieved', event);
    return true;
  });

  setTimeout(() => {
    const event: Event<TestEventPayload> = {
      id: 'some-wevent-id',
      created: new Date(),
      payload: {
        x: 10,
        y: 20,
      },
      ...test_event_def
    }

    rabbitmq_mq.publish(event);
  }, 5000)

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
