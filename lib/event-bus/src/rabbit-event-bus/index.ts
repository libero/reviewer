import { EventIdentifier, EventSubscriber, EventPublisher, Event } from '../event-bus';
import * as amqplib from 'amqplib';
import { Connection, Message } from 'amqplib';
import { Option, Some } from 'funfix';
import { InfraLogger as logger } from '../logger';

interface MessageWrapper<T> {
  event: T;
  meta: {
    attempts: number;
    retries: number;
    failures: number;
  };
}

export class RabbitEventBus implements EventSubscriber, EventPublisher {
  connection: Option<Connection>;
  serviceName: string = 'unknown_service';

  private defToExchange(def: EventIdentifier) {
    return `event__${def.kind}-${def.namespace}`;
  }

  private defToQueue(def: EventIdentifier) {
    return `consumer__${def.kind}-${def.namespace}__${this.serviceName}`;
  }

  private eventToMessage<T extends object>(event: Event<T>): MessageWrapper<Event<T>> {
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

  private messageToEvent<T extends object>(message: MessageWrapper<Event<T>>): Option<Event<T>> {
    return Option.of(message.event);
  }

  private async connect(): Promise<Connection> {
    let done;

    const attemptConnect = () => {
      // TODO: put this in configuration
      return amqplib.connect('amqp://rabbitmq')
        .then((connection) => {
          done(connection);
        })
        .catch(e => {
          logger.info('Couldn\'t connect to message queue, retrying in 10s');
          setTimeout (attemptConnect, 10000);
        });
    };

    return new Promise(resolve => {
      done = resolve;
      attemptConnect();
    });
  }

  public async init(eventDefs: EventIdentifier[], serviceName: string): Promise<this> {
    // The eventDefs are the names of events that this service will emit
    // It's probably good practice to always declare the events that the service emits

    this.serviceName = serviceName;
    // First things first
    this.connection = Option.of(
      await this.connect(),
    );
    // This is where we setup the queue structure in RabbitMQ

    const channel = await this.connection.get().createChannel();
    await Promise.all(
      eventDefs.map(async (def: EventIdentifier) => {
        return channel.assertExchange(this.defToExchange(def), 'fanout');
      }),
    ).catch(() => logger.fatal('can\'t create exchanges'));

    return this;
  }

  public async publish<T extends object>(event: Event<T>): Promise<boolean> {
    // Publishes an event to it's queue
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
  ) {
    // For the event identifier:
    //  - Declare a subscriber queue
    //  - bind that queue to event exchange
    // Runs the handler function on any event that matches that type
    this.connection
      .map(async (conn: Connection) => {
        const channel = await conn.createChannel();

        await channel
          .assertQueue(this.defToQueue(eventIdentifier))
          .then(async () => {
            await channel.bindQueue(
              this.defToQueue(eventIdentifier),
              this.defToExchange(eventIdentifier),
              '',
            );

            await channel.consume(
              this.defToQueue(eventIdentifier),
              async (msg: Message) => {
                try {
                  const message: MessageWrapper<Event<P>> = JSON.parse(msg.content.toString());
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
        logger.fatal('Can\'t subscribe');
        process.exit(-1);
      });
  }
}
