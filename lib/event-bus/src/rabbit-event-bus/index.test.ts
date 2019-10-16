import RabbitEventBus from '.';
import { Channel, channel } from 'rs-channel-node';
import { StateChange, ConnectedState } from './types';
import AMQPConnector from './amqp-connector';
import waitForExpect from 'wait-for-expect';

jest.mock('../logger');
jest.mock('./amqp-connector');

describe('AMQP Connection Manager', () => {
  describe('behaviour in a good connection state', () => {
    it('forwards messages to a connector', async () => {
      const publishMock = jest.fn(async () => true);

      // (...as any) needed because jest is magic
      // tslint:disable-next-line: no-any
      (AMQPConnector as any).mockImplementation(
        (__, [send, _]: Channel<StateChange>) => {
          send({
            newState: 'CONNECTED',
          });
          return {
            publish: publishMock,
            subscribe: jest.fn(),
          };
        },
      );
      const manager = await new RabbitEventBus({ url: '' }).init([], '');
      await manager.publish({
        eventType: 'test',
        id: 'something',
        created: new Date(),
        payload: {},
      });

      expect(publishMock).toBeCalled();
    });

    it('passes on subscribes to the connector immediately, while it\'s ready', async () => {
      const subscribeMock = jest.fn();
      const [readyNotify, readyWait] = channel<{}>();
      // (...as any) needed because jest is magic
      // tslint:disable-next-line: no-any
      (AMQPConnector as any).mockImplementation(
        (__, [send, _]: Channel<StateChange>) => {
          send({
            newState: 'CONNECTED',
          });

          readyNotify({});
          return {
            publish: jest.fn(),
            subscribe: subscribeMock,
          };
        },
      );

      const manager = await new RabbitEventBus({ url: '' }).init([], '');

      await manager.subscribe('test', jest.fn());

      await readyWait();
      expect(subscribeMock).toBeCalled();
    });

    it('it resolves publishes once they\'ve actually been published', async done => {
      const publishMock = jest.fn();

      // This channel is used to simulate startup delay in the connector
      const [readyNotify, readyWait] = channel<{}>();

      // (...as any) needed because jest is magic
      // tslint:disable-next-line: no-any
      (AMQPConnector as any).mockImplementation(
        (___, [send, _]: Channel<StateChange>, __, subscriptions) => {
          send({
            newState: 'CONNECTED',
          });
          readyWait().then(() => {
            send({
              newState: 'NOT_CONNECTED',
            });
          });
          return {
            subscriptions,
            publish: publishMock,
            subscribe: jest.fn(),
          };
        },
      );

      const manager = await new RabbitEventBus({ url: '' }).init([], '');

      Promise.all([
        manager.publish({
          eventType: 'test',
          id: 'something',
          created: new Date(),
          payload: {},
        }),
        manager.publish({
          eventType: 'test',
          id: 'something',
          created: new Date(),
          payload: {},
        }),
        manager.publish({
          eventType: 'test',
          id: 'something',
          created: new Date(),
          payload: {},
        }),
      ]);

      expect(publishMock).toBeCalledTimes(0);

      // simulate some startup delay in the connector
      setTimeout(() => {
        readyNotify({});
        // Expect the connector to be created with subscriptions
        expect(publishMock).toBeCalledTimes(3);
        done();
      }, 50);
    });

    it('passes on subscribes that are registered after the connector is ready', async done => {
      const subscribeMock = jest.fn();
      const connectMock = jest.fn();

      // This channel is used to simulate startup delay in the connector
      const [readyNotify, readyWait] = channel<{}>();

      // (...as any) needed because jest is magic
      // tslint:disable-next-line: no-any
      (AMQPConnector as any).mockImplementation(
        (_0, [send, _1]: Channel<StateChange>, _2, subscriptions) => {
          send({
            newState: 'CONNECTED',
          });
          readyWait().then(() => {
            send({
              newState: 'NOT_CONNECTED',
            });
          });
          return {
            subscriptions,
            connect: connectMock,
            publish: jest.fn(),
            subscribe: subscribeMock,
          };
        },
      );

      const manager = await new RabbitEventBus({ url: '' }).init([], '');

      await manager.subscribe('test', jest.fn());
      await manager.subscribe('test', jest.fn());
      await manager.subscribe('test', jest.fn());

      // tslint:disable-next-line: no-any
      expect((manager as any).subscriptions.length).toEqual(3);
      expect(subscribeMock).toBeCalledTimes(3);

      // simulate some startup delay in the connector
      setTimeout(() => {
        readyNotify({});
        // Expect the connector to be created with subscriptions
        // tslint:disable-next-line: no-any
        expect((manager as any).connector.get().subscriptions.length).toEqual(3);
        done();
      }, 50);
    });
  });

  describe('degraded state', () => {
    it('publish promises are not resolved after a failed connection', async done => {
      const subscribeMock = jest.fn();
      const connectMock = jest.fn();

      // tslint:disable-next-line: no-any
      (AMQPConnector as any).mockImplementation(
        (_0, [send, _1]: Channel<StateChange>, _2, subscriptions) => {
          send({
            newState: 'NOT_CONNECTED',
          });

          return {
            subscriptions,
            connect: connectMock,
            publish: jest.fn(() => false),
            subscribe: subscribeMock,
          };
        },
      );

      const manager = await new RabbitEventBus({ url: '' }).init([], '');
      const then = jest.fn();

      manager
        .publish({
          eventType: 'test',
          id: 'something',
          created: new Date(),
          payload: {},
        })
        .then(then);

      manager
        .publish({
          eventType: 'test',
          id: 'something',
          created: new Date(),
          payload: {},
        })
        .then(then);

      manager
        .publish({
          eventType: 'test',
          id: 'something',
          created: new Date(),
          payload: {},
        })
        .then(then);

      setTimeout(() => {
        expect(then).toHaveBeenCalledTimes(0);
        done();
      }, 250);
    });

    it('publish promises are resolved after a successful connection', async done => {
      const subscribeMock = jest.fn();

      // tslint:disable-next-line: no-any
      (AMQPConnector as any).mockImplementation(
        (_0, [send, _1]: Channel<StateChange>, _2, subscriptions) => {
          send({
            newState: 'CONNECTED',
          });

          return {
            subscriptions,
            publish: jest.fn(() => true),
            subscribe: subscribeMock,
          };
        },
      );

      const manager = await new RabbitEventBus({ url: '' }).init([], '');
      const then = jest.fn();

      manager
        .publish({
          eventType: 'test',
          id: 'something',
          created: new Date(),
          payload: {},
        })
        .then(then);

      manager
        .publish({
          eventType: 'test',
          id: 'something',
          created: new Date(),
          payload: {},
        })
        .then(then);

      manager
        .publish({
          eventType: 'test',
          id: 'something',
          created: new Date(),
          payload: {},
        })
        .then(then);

      setTimeout(() => {
        expect(then).toHaveBeenCalledTimes(3);
        done();
      }, 250);
    });

    it('publish promises are published after a failed connection', async () => {
      const subscribeMock = jest.fn();
      const connectMock = jest.fn();
      let returnState: ConnectedState = 'NOT_CONNECTED';
      let returnPublish: boolean = false;

      // tslint:disable-next-line: no-any
      (AMQPConnector as any).mockImplementation(
        (_0, [send, _1]: Channel<StateChange>, _2, subscriptions) => {
          send({
            newState: returnState,
          });

          return {
            subscriptions,
            connect: connectMock,
            publish: jest.fn(() => returnPublish),
            subscribe: subscribeMock,
          };
        },
      );

      const manager = await new RabbitEventBus({ url: '' }).init([], '');
      const then = jest.fn();

      manager
        .publish({
          eventType: 'test',
          id: 'something',
          created: new Date(),
          payload: {},
        })
        .then(then);

      manager
        .publish({
          eventType: 'test',
          id: 'something',
          created: new Date(),
          payload: {},
        })
        .then(then);

      manager
        .publish({
          eventType: 'test',
          id: 'something',
          created: new Date(),
          payload: {},
        })
        .then(then);

      const checkNothingPublished = () => {
        return new Promise(resolve =>
          setTimeout(() => {
            expect(then).toHaveBeenCalledTimes(0);

            // 'reconnect' the connection
            returnPublish = true;
            returnState = 'CONNECTED';
            resolve();
          }, 250),
        );
      };

      // We need to wait for at least 250ms to ensure that nothing has been
      // inadvertently published.
      await checkNothingPublished();

      // This check will succeeded as quickly as possible.
      await waitForExpect(() => {
        expect(then).toHaveBeenCalledTimes(3);
      });
    });
  });

  // Tests that it queues up messages that it can't send and that resends then when it can
  // If a message fails to send it will retry it
});
