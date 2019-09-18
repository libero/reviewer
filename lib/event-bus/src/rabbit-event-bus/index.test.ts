// amqp driver tests
import { Some } from "funfix";
const amqplib = require("amqplib");
import { RabbitEventBus } from ".";

jest.mock("amqplib");
jest.useFakeTimers();


describe("RabbitMQ event-bus driver", () => {
  describe("Event publishing", () => {
    it("can publish an event", async () => {
      const publishMock = jest.fn();
      const channelCloseMock = jest.fn();

      const mockAmqplib = {
        connect: jest.fn( async () => ({
          createChannel: jest.fn(() => ({
            publish: publishMock,
            close: channelCloseMock
          })),
          createExchange: jest.fn()
        }))
      };

      const eb = await new RabbitEventBus("never", mockAmqplib as any).init(
        [],
        "testing service"
      );

      await eb.publish({ mock_event: true } as any);

      expect(publishMock).toHaveBeenCalledTimes(1);
      expect(channelCloseMock).toHaveBeenCalledTimes(1);
    });

    // This is not the desired behaviour,  but it's the current behaviour
    it("errors when trying to publish messages without a connection", async () => {
      const publishMock = jest.fn();
      const channelCloseMock = jest.fn();

      amqplib.connect.mockResolvedValue(undefined);

      const eb = new RabbitEventBus("never").init([], "testing service");

      expect(eb).rejects.toThrow("Option.get");
    });
  });

  describe("Event subscriptions", () => {
    it("allows you to subscribe to an event when there is a connection", async () => {
      const consumeMock = jest.fn(async () => ({}));
      const assertQueueMock = jest.fn(async () => ({}));
      const bindQueueMock = jest.fn(async () => undefined);
      const channelCloseMock = jest.fn();

      const mockAmqplib = {
        connect: jest.fn(async () => ({
          createChannel: jest.fn(async () => ({
            bindQueue: bindQueueMock,
            assertQueue: assertQueueMock,
            consume: consumeMock,
            ack: jest.fn(),
            nack: jest.fn(),
            close: channelCloseMock
          })),
          createExchange: jest.fn()
        }))
      };

      const eb = await (new RabbitEventBus("test", mockAmqplib as any).init([], "testing service"));

      await eb.subscribe<{ a: number }>(
        {
          kind: "something",
          namespace: "events"
        },
        jest.fn()
      );

      expect(assertQueueMock).toHaveBeenCalledTimes(1);
      expect(bindQueueMock).toHaveBeenCalledTimes(1);

      expect(consumeMock).toHaveBeenCalledTimes(1);

      // It doesn't  close the channel after it creates a handler
      expect(channelCloseMock).toHaveBeenCalledTimes(0);
    });

    it("allows you to subscribe to an event even when there is no connection", async () => {});

    it("acks the message when the handler successfully returns true", async () => {});

    it("nacks and requeues the message when the handler errors", async () => {});

    it("nacks and requeues the message when the handler returns false", async () => {});
  });

  describe("Connection and DX logic", () => {
    it("Fails gracefully if  you use the class without calling .init()", async () => {
      const eb = new RabbitEventBus("never");

      const exitMock = jest.fn();
      expect(eb.publish({ mock_event: true } as any)).resolves.toBe(false);

      await eb.subscribe(
        { namespace: "something", kind: "something" },
        async () => false
      );
    });

    it('re-attempts to subscribe if a subscription happens without a connection', async () => {

      const consumeMock = jest.fn();

      const mockAmqplib = {
        connect: jest.fn(async () => ({
          createChannel: jest.fn(async () => ({
            bindQueue: jest.fn(async () => undefined),
            assertQueue: jest.fn( async () => ({})),
            consume: consumeMock,
            ack: jest.fn(),
            nack: jest.fn(),
          })),
          createExchange: jest.fn()
        }))
      };

      const eb = new RabbitEventBus("never", mockAmqplib as any);


      await eb.subscribe(
        { namespace: "something", kind: "something" },
        async () => false
      );

      expect(consumeMock).toHaveBeenCalledTimes(0);

      await eb.init([], 'some_service');

      jest.runOnlyPendingTimers();

      expect(consumeMock).toHaveBeenCalledTimes(1);
    });
  });
});
