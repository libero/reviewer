import { Sender, Channel } from 'rs-channel-node';
import { Option } from 'funfix';
import { Connection, Message } from 'amqplib';
import * as amqplib from 'amqplib';
import { InfraLogger as logger } from '../logger';
import { EventType, Event } from '../event-bus';
import { Subscription, StateChange, MessageWrapper } from './types';
import { EventUtils } from './event-utils';

export default class AMQPConnector<M extends object> {
  private externalConnector: {
    send: Sender<StateChange<M>>;
  };
  private serviceName: string = 'unknown-service';

  private connection: Connection;

  public constructor(
    url: string,
    [sender]: Channel<StateChange<M>>,
    eventDefs: EventType[],
    subscriptions: Array<Subscription<unknown & object>>,
    serviceName: string,
  ) {
    this.externalConnector = { send: sender };

    this.serviceName = serviceName;

    // Set up the connections to the AMQP server
    this.connect(url)
      .then(async connection => {
        this.connection = connection;
        // Setup the exchanges

        const rabbitChannel = await this.connection.createChannel();
        await Promise.all(
          eventDefs.map(async (eventType: EventType) =>
            rabbitChannel.assertExchange(
              EventUtils.eventTypeToExchange(eventType),
              'fanout',
            ),
          ),
        )
          .catch(() => logger.fatal('can\'t create exchanges'))
          .then(() => {
            this.connected();
          });

        // Create subscribers here
        subscriptions.forEach(async subscription => {
          // subscribe
          await this.subscribe(
            subscription.eventType,
            subscription.handler,
          );
        });
      })
      .catch(() => {
        // notify the manager object that the connection has failed
        // logger.debug('connectionFailed, retrying');
        this.disconnected();
      });
  }

  private async connect(rabbitUrl: string): Promise<Connection> {
    try {
      const connection = await amqplib.connect(rabbitUrl);
      connection.on('error', () => this.disconnected());
      connection.on('end', () => this.disconnected());
      connection.on('close', () => this.disconnected());

      return connection;
    } catch (e) {
      throw new Error('Connection failed');
    }
  }

  public async subscribe<P extends object>(
    eventType: EventType,
    handler: (ev: Event<P>) => Promise<boolean>,
  ): Promise<void> {
    // For the event identifier:
    //  - Declare a subscriber queue
    //  - bind that queue to event exchange
    // Runs the handler function on any event that matches that type
    return Option.of(this.connection)
      .map(async (conn: Connection) => {
        const rabbitChannel = await conn.createChannel();
        rabbitChannel.on('error', () => this.disconnected());

        return await rabbitChannel
          .assertQueue(EventUtils.eventTypeToQueue(eventType, this.serviceName))
          .then(async () => {
            await rabbitChannel.bindQueue(
              EventUtils.eventTypeToQueue(eventType, this.serviceName),
              EventUtils.eventTypeToExchange(eventType),
              '',
            );
            logger.trace('subscribe');

            await rabbitChannel.consume(
              EventUtils.eventTypeToQueue(eventType, this.serviceName),
              async (msg: Message) => {
                try {
                  const message: MessageWrapper<Event<P>> = JSON.parse(
                    msg.content.toString(),
                  );

                  handler(EventUtils.messageToEvent(message).get()).then(
                    isOk => {
                      if (isOk) {
                        // Ack
                        rabbitChannel.ack(msg);
                      } else {
                        // Nack
                        logger.warn('eventHandlerFailure');
                        rabbitChannel.nack(msg, false, true);
                      }
                    },
                  );
                } catch (e) {
                  rabbitChannel.nack(msg, false, false);
                  logger.warn('Can\'t parse JSON');
                }
              },
            );
          })
          .catch(() => {
            logger.fatal('can\'t create subscriber queues');
          });
      })
      .getOrElseL(() => {
        // Do we want to handle reconnects &/or retries here?
        setTimeout(() => this.subscribe(eventType, handler), 1000);
        logger.warn('No connection, can\'t subscribe, trying again soon!');
      });
  }

  public async publish<P extends object>(event: Event<P>): Promise<boolean> {
    // publish the message
    const whereTo = EventUtils.eventTypeToExchange(event.eventType);
    return Option.of(this.connection)
      .map(async connection => {
        try {
          const rabbitChannel = await connection.createChannel();
          // Channels only really error because of connection issues
          rabbitChannel.on('error', () => this.disconnected());

          await rabbitChannel.publish(
            whereTo,
            '',
            Buffer.from(JSON.stringify(EventUtils.eventToMessage(event))),
          );

          rabbitChannel.close();
          return true;
        } catch (e) {
          logger.error('couldn\'t publish message', e);
          return false;
        }
      })
      .getOrElse(false);
  }

  private disconnected() {
    this.externalConnector.send({ newState: 'NOT_CONNECTED' });
  }

  private connected() {
    this.externalConnector.send({ newState: 'CONNECTED' });
  }
}
