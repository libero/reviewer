
import { Sender, Receiver, Channel, channel } from 'rs-channel-node';
import { Option, None, Some } from 'funfix';
import { Connection } from 'amqplib';
import * as amqplib from 'amqplib';
import { InfraLogger as logger } from '../logger';
import { EventIdentifier, Event } from '../event-bus';
import { StateChange } from './types';
import { Serialization } from './Serializer';

export class AMQPConnector<M extends object> {
  private externalConnector: {
    send: Sender<StateChange<M>>;
    recv: Receiver<{}>;
  };
  private innerChannel: Channel<{}> = channel<{}>(); // possibly not needed
  private serviceName: string = 'unknown-service';

  private connection: Connection;

  public constructor(
    [sender]: Channel<StateChange<M>>,
    eventDefs: EventIdentifier[],
    serviceName: string,
  ) {
    const [_, recv] = this.innerChannel;
    // Constructor!
    this.externalConnector = { send: sender, recv };

    // Set up the connections to the AMQP server
    this.connect('amqp://rabbit').then(async connection => {
      this.connection = connection;
      // Setup the exchanges

      const rabbitChannel = await this.connection.createChannel();
      await Promise.all(
        eventDefs.map(async (def: EventIdentifier) => {
          return rabbitChannel.assertExchange(
            Serialization.defToExchange(def),
            'fanout',
          );
        }),
      )
        .catch(() => logger.fatal('can\'t create exchanges'))
        .then(() => {
          this.connected();
        });
    });
    // Start subscribing to stuff
  }

  private async connect(rabbitUrl: string): Promise<Connection> {
    try {
      const connection = await amqplib.connect(rabbitUrl);
      connection.on('error', () => this.disconnected());
      connection.on('end', () => this.disconnected());
      connection.on('finish', () => this.disconnected());

      return connection;
    } catch (e) {
      // notify the manager object that the connection has failed
      this.disconnected();
      throw new Error('Connection failed');
    }
  }

  // Do we even need an inner sender? Couldn't we just "send the message" in a function call?
  public getInnerSender(): Sender<{}> {
    const [send, _] = this.innerChannel;

    return send;
  }

  public async publish(event: Event<M>): Promise<boolean> {
    // publish the message
    const whereTo = Serialization.defToExchange(event);
    return Option.of(this.connection)
      .map(async connection => {
        const rabbitChannel = await connection.createChannel();

        await rabbitChannel.publish(
          whereTo,
          '',
          Buffer.from(JSON.stringify(Serialization.eventToMessage(event))),
        );

        rabbitChannel.close();
        return true;
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
