import {
  EventIdentifier,
  EventSubscriber,
  EventPublisher,
  Event,
} from '../event-bus';
import * as amqplib from 'amqplib';
import { Connection, Message } from 'amqplib';
import { Option, Some, None } from 'funfix';
import { InfraLogger as logger } from '../logger';
import { debounce } from 'lodash';

interface MessageWrapper<T> {
  event: T;
  meta: {
    attempts: number;
    retries: number;
    failures: number;
  };
}

export class RabbitEventBus implements EventSubscriber, EventPublisher {
  private connection: Option<Connection> = None;
  serviceName: string = 'unknown_service';
  private connectionString: string = 'amqp://rabbitmq';

  public constructor(amqpUrl: string) {
    this.connectionString = amqpUrl;
  }

  private async connect() {
    // This function does two things:
    // - It creates a connection to the RabbitMQ server
    // - It starts heartbeat and reconnect logic;

    const connectionfn = debounce(
      async () => {
        this.connection = Option.of(
          await amqplib.connect(this.connectionString),
        );
      },
      100,
      {
        leading: true,
      },
    );

    // Do the heartbeat here - if we can't connect, then debounce the reconnects!

    await connectionfn();
  }

  private defToExchange(def: EventIdentifier) {
    return `event__${def.kind}-${def.namespace}`;
  }

  private defToQueue(def: EventIdentifier) {
    return `consumer__${def.kind}-${def.namespace}__${this.serviceName}`;
  }

  private eventToMessage<T extends object>(
    event: Event<T>,
  ): MessageWrapper<Event<T>> {
    // Wrap the event in some internal transport layer format, in effect transforming the
    // event into a message
    return {
      event,
      meta: {
        attempts: 0, // increments each process
        retries: 10, // total retries
        failures: 0, // increments each failure
      },
    };
  }

  private messageToEvent<T extends object>(
    message: MessageWrapper<Event<T>>,
  ): Option<Event<T>> {
    return Option.of(message.event);
  }

  public async init(
    eventDefs: EventIdentifier[],
    serviceName: string,
  ): Promise<this> {
    // The eventDefs are the names of events that this service will emit
    // It's probably good practice to always declare the events that the service emits

    this.serviceName = serviceName;
    // First things first
    await this.connect();

    const channel = await this.connection.get().createChannel();
    await Promise.all(
      eventDefs.map(async (def: EventIdentifier) => {
        return channel.assertExchange(this.defToExchange(def), 'fanout');
      }),
    ).catch(() => logger.fatal('can\'t create exchanges'));

    return this;
  }

  public async publish<T extends object>(event: Event<T>): Promise<boolean> {
    // Publishes an event to it's queue -- Do we want local queueing, in case of a connection drop?
    const whereTo = this.defToExchange(event);
    return this.connection
      .map(async connection => {
        const channel = await connection.createChannel();

        await channel.publish(
          whereTo,
          '',
          Buffer.from(JSON.stringify(this.eventToMessage(event))),
        );

        channel.close();
        return true;
      })
      .getOrElse(false);
  }

  public async subscribe<P extends object>(
    eventIdentifier: EventIdentifier,
    handler: (ev: Event<P>) => Promise<boolean>,
  ): Promise<void> {
    // For the event identifier:
    //  - Declare a subscriber queue
    //  - bind that queue to event exchange
    // Runs the handler function on any event that matches that type
    return this.connection
      .map(async (conn: Connection) => {
        const channel = await conn.createChannel();

        return await channel
          .assertQueue(this.defToQueue(eventIdentifier))
          .then(async () => {
            await channel.bindQueue(
              this.defToQueue(eventIdentifier),
              this.defToExchange(eventIdentifier),
              '',
            );
            console.log('subscribe');

            await channel.consume(
              this.defToQueue(eventIdentifier),
              async (msg: Message) => {
                try {
                  const message: MessageWrapper<Event<P>> = JSON.parse(
                    msg.content.toString(),
                  );
                  logger.info('eventRecv', { message });

                  handler(this.messageToEvent(message).get()).then(isOk => {
                    if (isOk) {
                      // Ack
                      channel.ack(msg);
                    } else {
                      // Nack
                      logger.warn('eventHandlerFailure');
                      channel.nack(msg, false, true);
                    }
                  });
                } catch (e) {
                  channel.nack(msg, false, false);
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
        setTimeout(() => this.subscribe(eventIdentifier, handler), 1000);
        logger.warn('No connection, can\'t subscribe, trying again soon!');
      });
  }
}
