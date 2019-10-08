import { connect, Connection } from 'amqplib';
import * as flushPromises from 'flush-promises';
import AMQPConnector from "./amqp-connector";
import { channel } from 'rs-channel-node';
import { StateChange } from './types';

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

    it('should connect properly and create a channel', async () => {
        const mockConnection = {
            createChannel: jest.fn(),
            on: jest.fn()
        } as unknown as Connection;

        (connect as any).mockImplementation(async (): Promise<Connection> => mockConnection);
        new AMQPConnector<{}>(url, channel<StateChange<{}>>(), [], [], 'service');

        await flushPromises();
        expect(connect).toHaveBeenCalledTimes(1);
        expect(connect).toHaveBeenCalledWith(url);
        expect(mockConnection.createChannel).toHaveBeenCalledTimes(1);
    });

    it.only('should throw an error when connection fails', async () => {
        (connect as any).mockImplementation(async (): Promise<Connection> => Promise.reject());
        // mock this somehow
        const sender = (___: StateChange<{}>) => jest.fn();
        const receiver = async (): Promise<StateChange<{}>> => { return {} as StateChange<{}>};

        const connector = new AMQPConnector<{}>(url, [sender, receiver], [], [], 'service');

        await flushPromises();
        // expect(sender).toHaveBeenCalledTimes(1);
        // expect(sender).toHaveBeenCalledWith({ newState: 'NOT_CONNECTED' });
    });
});
