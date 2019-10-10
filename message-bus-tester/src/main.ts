import * as express from "express";
import { Request, Response } from "express";
import { InfraLogger as logger } from './logger';
import { Event, EventIdentifier, RabbitEventBus, MockEventBus } from '@libero/event-bus';

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
  const mock_mq = await (new MockEventBus()).init([test_event_def, test_event_def], "message-bus-test");
  logger.info("messageQueueStarted");

  mock_mq.subscribe<TestEventPayload>(test_event_def, async (event) => {
    logger.info('mockEventReceived', event);
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
  const rabbitmq_mq = await (new RabbitEventBus({url: 'amqp://rabbitmq'})).init([test_event_def, test_event_def], "message-bus-test");
  logger.info("messageQueueStarted");

  rabbitmq_mq.subscribe<TestEventPayload>(test_event_def, async (event: Event<TestEventPayload>) => {
    logger.info('rabbitEventRecieved', event);
    return true;
  });

  setInterval(async () => {
    const event: Event<TestEventPayload> = {
      id: 'some-wevent-id',
      created: new Date(),
      payload: {
        x: 10,
        y: 20,
      },
      ...test_event_def
    }

    console.log("send attempt");
    rabbitmq_mq.publish(event).then(() => console.log("send complete"));
  }, 500)

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
