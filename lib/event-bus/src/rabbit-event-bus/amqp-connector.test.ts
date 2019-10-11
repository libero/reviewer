import { connect, Connection } from 'amqplib';
import * as flushPromises from 'flush-promises';
import AMQPConnector from './amqp-connector';
import { StateChange } from './types';
import { channel } from 'rs-channel-node';
import { Event } from 'event-bus';
import { InfraLogger as logger } from '../logger';

jest.mock('amqplib');
jest.mock('../logger');

beforeEach(() => jest.resetAllMocks());

describe('AMQP connector', () => {
    const url = 'http://example.com';
    const makeConnection = (mockChannel?) => ({
        createChannel: mockChannel ? () => mockChannel : jest.fn(),
        on: jest.fn(),
    } as unknown as Connection);
    // tslint:disable-next-line: no-any
    const makeChannel = (options: any = {}) => ({
        assertQueue: jest.fn(),
        assertExchange: jest.fn(),
        bindQueue: jest.fn(),
        consume: jest.fn(),
        publish: jest.fn(),
        on: jest.fn(),
        ack: jest.fn(),
        nack: jest.fn(),
        close: jest.fn(),
        ...options,
    });

    describe('constructor', () => {
        it('should create a channel and set connected state', async () => {
            const mockConnection = makeConnection();

            // tslint:disable-next-line: no-any
            (connect as any).mockImplementation(async (): Promise<Connection> => mockConnection);
            // tslint:disable-next-line: no-empty
            const sender = jest.fn().mockImplementation((___: StateChange<{}>) => {});
            const receiver = async (): Promise<StateChange<{}>> => ({} as StateChange<{}>);
            const _ = new AMQPConnector<{}>(url, [sender, receiver], [], [], 'service');

            await flushPromises();
            expect(connect).toHaveBeenCalledTimes(1);
            expect(connect).toHaveBeenCalledWith('http://example.com');
            expect(mockConnection.createChannel).toHaveBeenCalledTimes(1);
            expect(sender).toHaveBeenCalledTimes(1);
            expect(sender).toHaveBeenCalledWith({ newState: 'CONNECTED'});
        });

        it('should set to not connected state on connection error', async () => {
            // tslint:disable-next-line: no-any
            (connect as any).mockImplementation(async (): Promise<Connection> => Promise.reject());
            // tslint:disable-next-line: no-empty
            const sender = jest.fn().mockImplementation((___: StateChange<{}>) => {});
            const receiver = async (): Promise<StateChange<{}>> => ({} as StateChange<{}>);
            const _ = new AMQPConnector<{}>(url, [sender, receiver], [], [], 'service');

            await flushPromises();
            expect(sender).toHaveBeenCalledTimes(1);
            expect(sender).toHaveBeenCalledWith({ newState: 'NOT_CONNECTED' });
        });

        it('should assert the right exchanges', async () => {
            const mockChannel = makeChannel({ assertExchange: jest.fn() });
            const mockConnection = makeConnection(mockChannel);

            // tslint:disable-next-line: no-any
            (connect as any).mockImplementation(async (): Promise<Connection> => mockConnection);
            const _ = new AMQPConnector<{}>(url, channel(), ['test:event'], [], 'service');

            await flushPromises();
            expect(mockChannel.assertExchange).toHaveBeenCalledTimes(1);
            expect(mockChannel.assertExchange).toHaveBeenCalledWith('event__test:event', 'fanout');
        });

        it('should subscribe to the right queue', async () => {
            const mockChannel = makeChannel({ assertQueue: jest.fn().mockImplementation(() => Promise.resolve()) });
            const mockConnection = makeConnection(mockChannel);
            const eventType = 'test:event';

            // tslint:disable-next-line: no-any
            (connect as any).mockImplementation(async (): Promise<Connection> => mockConnection);
            const _ = new AMQPConnector<{}>(url, channel(), [], [{ eventType, handler: jest.fn()}], 'service');

            await flushPromises();
            expect(mockChannel.assertQueue).toHaveBeenCalledTimes(1);
            expect(mockChannel.assertQueue).toHaveBeenCalledWith('consumer__test:event__service');
            expect(mockChannel.bindQueue).toHaveBeenCalledTimes(1);
            expect(mockChannel.bindQueue).toHaveBeenCalledWith('consumer__test:event__service', 'event__test:event', '');
            expect(mockChannel.consume).toHaveBeenCalledTimes(1);
            expect(mockChannel.consume.mock.calls[0][0]).toBe('consumer__test:event__service');
        });
    });

    describe('publish', () => {
        it('should publish to the right exchanges', async () => {
            const mockChannel = makeChannel();
            const mockConnection = makeConnection(mockChannel);
            const event = {
                eventType: 'test:event',
                id: 'id',
                created: new Date(),
                payload: { data: 'payload' },
            };

            // tslint:disable-next-line: no-any
            (connect as any).mockImplementation(async (): Promise<Connection> => mockConnection);
            const connector = new AMQPConnector<{}>(url, channel(), ['test:event'], [], 'service');

            // we need to wait for connection to be stored before we can publish
            await flushPromises();
            await connector.publish(event as Event<{}>);

            await flushPromises();
            expect(mockChannel.publish).toHaveBeenCalledTimes(1);
            expect(mockChannel.publish.mock.calls[0][0]).toBe('event__test:event');
            expect(mockChannel.publish.mock.calls[0][1]).toBe('');
            expect(mockChannel.publish.mock.calls[0][2]).toEqual(Buffer.from(JSON.stringify({
                event,
                meta: {
                    attempts: 0,
                    retries: 10,
                    failures: 0, // increments each failure
                },
            })));
        });
    });

    describe('subscribe', () => {
        it('should subscribe to the right queue', async () => {
            const mockChannel = makeChannel({ assertQueue: jest.fn().mockImplementation(() => Promise.resolve()) });
            const mockConnection = makeConnection(mockChannel);

            // tslint:disable-next-line: no-any
            (connect as any).mockImplementation(async (): Promise<Connection> => mockConnection);
            const connector = new AMQPConnector<{}>(url, channel(), [], [], 'service');

            await flushPromises();
            await connector.subscribe('test:event', jest.fn());

            expect(mockChannel.assertQueue).toHaveBeenCalledTimes(1);
            expect(mockChannel.assertQueue).toHaveBeenCalledWith('consumer__test:event__service');
            expect(mockChannel.bindQueue).toHaveBeenCalledTimes(1);
            expect(mockChannel.bindQueue).toHaveBeenCalledWith('consumer__test:event__service', 'event__test:event', '');
            expect(mockChannel.consume).toHaveBeenCalledTimes(1);
            expect(mockChannel.consume.mock.calls[0][0]).toBe('consumer__test:event__service');
        });

        it('it should call the subscription handler and acknowledge', async () => {
            const mockChannel = makeChannel({
                assertQueue: jest.fn().mockImplementation(() => Promise.resolve()),
                consume: (___, callback) => {
                    callback({
                        content: { toString: () => '{ "event": "foo" }' },
                    });
                },
            });
            const mockConnection = makeConnection(mockChannel);

            // tslint:disable-next-line: no-any
            (connect as any).mockImplementation(async (): Promise<Connection> => mockConnection);
            const connector = new AMQPConnector<{}>(url, channel(), [], [], 'service');
            const handler = jest.fn().mockImplementation(async () => Promise.resolve(true));

            await flushPromises();
            await connector.subscribe('test:event', handler);

            await flushPromises();
            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler).toHaveBeenCalledWith('foo');
            expect(mockChannel.ack).toHaveBeenCalledTimes(1);
            expect(mockChannel.ack.mock.calls[0][0].content.toString()).toBe('{ "event": "foo" }');
        });

        it('it should call the subscription handler and unacknowledge if not ok', async () => {
            const mockChannel = makeChannel({
                assertQueue: jest.fn().mockImplementation(() => Promise.resolve()),
                consume: (___, callback) => {
                    callback({
                        content: { toString: () => '{ "event": "foo" }' },
                    });
                },
            });
            const mockConnection = makeConnection(mockChannel);

            // tslint:disable-next-line: no-any
            (connect as any).mockImplementation(async (): Promise<Connection> => mockConnection);
            const connector = new AMQPConnector<{}>(url, channel(), [], [], 'service');
            const handler = jest.fn().mockImplementation(async () => Promise.resolve());

            await flushPromises();
            await connector.subscribe('test:event', handler);

            await flushPromises();
            expect(handler).toHaveBeenCalledTimes(1);
            expect(logger.warn).toHaveBeenCalledTimes(1);
            expect(logger.warn).toHaveBeenCalledWith('eventHandlerFailure');
            expect(mockChannel.nack).toHaveBeenCalledTimes(1);
            expect(mockChannel.nack.mock.calls[0][0].content.toString()).toBe('{ "event": "foo" }');
            expect(mockChannel.nack.mock.calls[0][1]).toBe(false);
            expect(mockChannel.nack.mock.calls[0][2]).toBe(true);
        });
    });

    it('it should not acknowledge message with invalid event', async () => {
        const mockChannel = makeChannel({
            assertQueue: jest.fn().mockImplementation(() => Promise.resolve()),
            consume: (___, callback) => {
                callback({
                    content: { toString: () => 'not json' },
                });
            },
        });
        const mockConnection = makeConnection(mockChannel);

        // tslint:disable-next-line: no-any
        (connect as any).mockImplementation(async (): Promise<Connection> => mockConnection);
        const connector = new AMQPConnector<{}>(url, channel(), [], [], 'service');
        const handler = jest.fn().mockImplementation(async () => Promise.resolve());

        await flushPromises();
        await connector.subscribe('test:event', handler);

        await flushPromises();
        expect(handler).toHaveBeenCalledTimes(0);
        expect(logger.warn).toHaveBeenCalledTimes(1);
        expect(logger.warn).toHaveBeenCalledWith('Can\'t parse JSON');
        expect(mockChannel.nack).toHaveBeenCalledTimes(1);
        expect(mockChannel.nack.mock.calls[0][0].content.toString()).toBe('not json');
        expect(mockChannel.nack.mock.calls[0][1]).toBe(false);
        expect(mockChannel.nack.mock.calls[0][2]).toBe(false);
    });
});
