import { connect, Connection } from 'amqplib';
import * as flushPromises from 'flush-promises';
import AMQPConnector from './amqp-connector';
import { StateChange } from './types';
import { channel } from 'rs-channel-node';
import { Event } from 'event-bus';

// Tests for the amqp connector
// - publishes to the right exchange
// - subscribes to the right queue
// - runs the handler
// - acknowledges the message when it handles the event correctly
// - unacknowledges the message when it handles the event incorrectly
// - when the connection fails it initialises a state change event

// Tests for integration of amqp connector and index

// Test against running amqp instance - this will be when it's it's own repository

jest.mock('amqplib');

describe('AMQP connector', () => {
    const url = 'http://example.com';

    it('should create a channel and set connected state', async () => {
        const mockConnection = {
            createChannel: jest.fn(),
            on: jest.fn(),
        } as unknown as Connection;

        // tslint:disable-next-line
        (connect as any).mockImplementation(async (): Promise<Connection> => mockConnection);
        const sender = jest.fn().mockImplementation((___: StateChange<{}>) => {});
        const receiver = async (): Promise<StateChange<{}>> => ({} as StateChange<{}>);
        const _ = new AMQPConnector<{}>(url, [sender, receiver], [], [], 'service');

        await flushPromises();
        expect(connect).toHaveBeenCalledTimes(1);
        expect(connect).toHaveBeenCalledWith(url);
        expect(mockConnection.createChannel).toHaveBeenCalledTimes(1);
        expect(sender).toHaveBeenCalledTimes(1);
        expect(sender).toHaveBeenCalledWith({ newState: 'CONNECTED'});
    });

    it('should set to not connected state on connection error', async () => {
        // tslint:disable-next-line
        (connect as any).mockImplementation(async (): Promise<Connection> => Promise.reject());
        const sender = jest.fn().mockImplementation((___: StateChange<{}>) => {});
        const receiver = async (): Promise<StateChange<{}>> => ({} as StateChange<{}>);
        const _ = new AMQPConnector<{}>(url, [sender, receiver], [], [], 'service');

        await flushPromises();
        expect(sender).toHaveBeenCalledTimes(1);
        expect(sender).toHaveBeenCalledWith({ newState: 'NOT_CONNECTED' });
    });

    it('should assert the right exchanges', async () => {
        const mockChannel = {
            assertExchange: jest.fn()
        };
        const mockConnection = {
            createChannel: () => mockChannel,
            on: jest.fn(),
        } as unknown as Connection;

        // tslint:disable-next-line
        (connect as any).mockImplementation(async (): Promise<Connection> => mockConnection);
        const _ = new AMQPConnector<{}>(url, channel(), [{ kind: 'foo', namespace: 'bar' }], [], 'service');

        await flushPromises();

        expect(mockChannel.assertExchange).toHaveBeenCalledTimes(1);
        expect(mockChannel.assertExchange).toHaveBeenCalledWith('event__foo-bar', 'fanout');
    })

    it('should publish to the right exchanges', async () => {
        const mockChannel = {
            assertExchange: jest.fn(),
            publish: jest.fn(),
            on: jest.fn(),
            close: jest.fn(),
        };
        const mockConnection = {
            createChannel: () => mockChannel,
            on: jest.fn(),
        } as unknown as Connection;
        const event = {
            kind: 'foo',
            namespace: 'bar',
            id: 'id',
            created: new Date(),
            payload: { data: 'payload' }
        };

        // tslint:disable-next-line
        (connect as any).mockImplementation(async (): Promise<Connection> => mockConnection);
        const connector = new AMQPConnector<{}>(url, channel(), [{ kind: 'foo', namespace: 'bar' }], [], 'service');

        // we need to wait for connection to be stored before we can publish
        await flushPromises();
        await connector.publish(event as Event<{}>);

        await flushPromises();
        expect(mockChannel.publish).toHaveBeenCalledTimes(1);
        expect(mockChannel.publish.mock.calls[0][0]).toBe('event__foo-bar');
        expect(mockChannel.publish.mock.calls[0][1]).toBe('');
        expect(mockChannel.publish.mock.calls[0][2]).toEqual(Buffer.from(JSON.stringify({
            event,
            meta: {
                attempts: 0,
                retries: 10,
                failures: 0, // increments each failure
            }
        })));
    });

    it('should subscribe to the right queue', async () => {
        const mockChannel = {
            assertQueue: jest.fn().mockImplementation(() => Promise.resolve()),
            bindQueue: jest.fn(),
            consume: jest.fn(),
            publish: jest.fn(),
            on: jest.fn(),
            close: jest.fn(),
        };
        const mockConnection = {
            createChannel: () => mockChannel,
            on: jest.fn(),
        } as unknown as Connection;

        // tslint:disable-next-line
        (connect as any).mockImplementation(async (): Promise<Connection> => mockConnection);
        const connector = new AMQPConnector<{}>(url, channel(), [], [], 'service');

        await flushPromises();
        await connector.subscribe({ kind: 'foo', namespace: 'bar' }, jest.fn());

        expect(mockChannel.assertQueue).toHaveBeenCalledTimes(1);
        expect(mockChannel.assertQueue).toHaveBeenCalledWith('consumer__foo-bar__service');
        expect(mockChannel.bindQueue).toHaveBeenCalledTimes(1);
        expect(mockChannel.bindQueue).toHaveBeenCalledWith('consumer__foo-bar__service', 'event__foo-bar', '');
        expect(mockChannel.consume).toHaveBeenCalledTimes(1);
        expect(mockChannel.consume.mock.calls[0][0]).toBe('consumer__foo-bar__service');
    });
});
