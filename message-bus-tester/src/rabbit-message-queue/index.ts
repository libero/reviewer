import { EventIdentifier, MessageQueue, Event } from "../message-queue";
import * as amqplib from "amqplib";
import { Connection, Message } from "amqplib";
import { Option, Some } from "funfix";
import { InfraLogger as logger } from "../logger";

export class RabbitMessageQueue implements MessageQueue {
  connection: Option<Connection>;
  private defToExchange(def: EventIdentifier) {
    return `event-${def.kind}-${def.namespace}--ex`;
  }

  private defToQueue(def: EventIdentifier) {
    return `consumer-${def.kind}-${def.namespace}-service_name`;
  }

  public async init(event_defs: EventIdentifier[]): Promise<this> {
    // First things first
    this.connection = Option.of(
      // TODO: put this in configuration
      await amqplib.connect("amqp://rabbitmq").catch(() => undefined)
    );
    // This is where we setup the queue structure in RabbitMQ

    const channel = await this.connection.get().createChannel();
    await Promise.all(
      event_defs.map(async (def: EventIdentifier) => {
        return channel.assertExchange(this.defToExchange(def), "fanout");
      })
    ).catch(() => logger.fatal("can't create exchanges"));

    return this;
  }

  public async publish<T extends object>(event: Event<T>): Promise<boolean> {
    // Publishes an event to it's queue
    const where_to = this.defToExchange(event);
    return false;
  }

  public async subscribe<P extends object>(
    event_identifier: EventIdentifier,
    handler: (ev: Event<P>) => Promise<boolean>
  ) {
    // For the event identifier:
    //  - Declare a subscriber queue
    //  - bind that queue to event exchange
    // Runs the handler function on any event that matches that type
    this.connection
      .map(async (conn: Connection) => {
        const channel = await conn.createChannel();

        await channel
          .assertQueue(this.defToQueue(event_identifier))
          .then(async () => {
            await channel.bindQueue(
              this.defToQueue(event_identifier),
              this.defToExchange(event_identifier),
              ""
            );

            await channel.assertQueue(this.defToQueue(event_identifier)+'_bonus')
            await channel.bindQueue(
              this.defToQueue(event_identifier)+"_bonus",
              this.defToExchange(event_identifier),
              ""
            );

            await channel.consume(
              this.defToQueue(event_identifier),
              async (msg: Message) => {
                try {
                  const event: Event<P> = JSON.parse(msg.content.toString());
                  logger.info("eventRecv", { event });

                  handler(event).then(isOk => {
                    if (isOk) {
                      // Ack
                      channel.ack(msg);
                    } else {
                      // Nack
                      logger.warn("eventHandlerFailure");
                      channel.nack(msg, false, true);
                    }
                  });
                } catch (e) {
                  channel.nack(msg, false, false);
                  logger.warn("Can't parse JSON");
                }
              }
            );
          })
          .catch(() => {
            logger.fatal("can't create subscriber queues");
          });
      })
      .getOrElseL(() => {
        logger.fatal("Can't subscribe");
        process.exit(-1);
      });
  }
}
