import RabbitEventBus from '.';
import { Channel, channel } from 'rs-channel-node';
import { StateChange } from './types';
import AMQPConnector from './amqp-connector';
import * as logger from '../logger';
// Hide log messages
jest.mock('../logger');
jest.mock('./amqp-connector');

describe('AMQP Connection Manager', () => {
  describe('behaviour in a good connection state', () => {
    it('forwards messages to a connector', async () => {
      const publishMock = jest.fn(async () => true);

      // (...as any) needed because jest is magic
      // tslint:disable-next-line
      (AMQPConnector as any).mockImplementation(
        ([send, _]: Channel<StateChange<{}>>) => {
          send({
            newState: 'CONNECTED',
          });
          return {
            publish: publishMock,
            subscribe: jest.fn(),
          };
        },
      );
      const manager = new RabbitEventBus([], '');
      await manager.publish({
        kind: 'test',
        namespace: 'test',
        id: 'soemthing',
        created: new Date(),
        payload: {},
      });

      expect(publishMock).toBeCalled();
    });

    it('passes on subscribes to the connector immediately, while it\'s ready', async () => {
      const subscribeMock = jest.fn();
      const [readyNotify, readyWait] = channel<{}>();
      // (...as any) needed because jest is magic
      // tslint:disable-next-line
      (AMQPConnector as any).mockImplementation(
        ([send, _]: Channel<StateChange<{}>>) => {
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

      const manager = new RabbitEventBus([], '');

      await manager.subscribe(
        {
          kind: 'test',
          namespace: 'test',
        },
        jest.fn(),
      );

      await readyWait();
      expect(subscribeMock).toBeCalled();
    });

    it('passes on subscribes that are registered after the connector is ready', async ( done ) => {
      const subscribeMock = jest.fn();

      // This channel is used to simulate startup delay in the connector
      const [readyNotify, readyWait] = channel<{}>();

      // (...as any) needed because jest is magic
      // tslint:disable-next-line
      (AMQPConnector as any).mockImplementation(
        ([send, _]: Channel<StateChange<{}>>) => {
          send({
            newState: 'CONNECTED',
          });
          readyWait().then(() => {
            send({
              newState: 'NOT_CONNECTED',
            }); },
          );
          return {
            publish: jest.fn(),
            subscribe: subscribeMock,
          };
        },
      );

      const manager = new RabbitEventBus([], '');

      await manager.subscribe(
        {
          kind: 'test',
          namespace: 'test',
        },
        jest.fn(),
      );
      await manager.subscribe(
        {
          kind: 'test',
          namespace: 'test',
        },
        jest.fn(),
      );
      await manager.subscribe(
        {
          kind: 'test',
          namespace: 'test',
        },
        jest.fn(),
      );

      expect(subscribeMock).toBeCalledTimes(3);

      // simulate some startup delay in the connector
      setTimeout(() => {
        readyNotify({});
        // It should call the subscribes again for the mock function
        expect(subscribeMock).toBeCalledTimes(6);
        done();
      }, 200);
    });
  });

  describe('behaviour with a failed connection', () => {});
});
