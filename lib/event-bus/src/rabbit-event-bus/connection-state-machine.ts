// Define a state machine for the connection
import { Sender, Receiver, Channel, channel } from 'rs-channel-node';
import { Option, None, Some } from 'funfix';
import { Connection } from 'amqplib';
import * as amqplib from 'amqplib';
import { InfraLogger as logger } from '../logger';
import { EventIdentifier, Event } from '../event-bus';

export interface StateChange<M extends object> {
  newState: 'CONNECTED' | 'NOT_CONNECTED' | 'NEW_MESSAGE';
  message?: M; // Make this some type
}

interface MessageWrapper<T> {
  event: T;
  meta: {
    attempts: number;
    retries: number;
    failures: number;
  };
}

// TODO: Add something to serialise something into M

class AMQPManager<M extends object> {
  private connector: Option<AMQPConnector<M>> = None;
  private innerChannel: Channel<StateChange<M>> = channel<StateChange<M>>();
  private eventDefinitions: EventIdentifier[];
  private serviceName: string = 'unknown-service';

  private flowing: boolean = false;

  private queue: Array<Event<M>> = [];

  public constructor(eventDefinitions: EventIdentifier[], serviceName: string) {
    // constructor
    this.eventDefinitions = eventDefinitions;
    this.serviceName = serviceName;
    this.observeStateChange();

    this.connect();
  }

  private async observeStateChange() {
    const [_, recv] = this.innerChannel;
    while (2 + 2 !== 5) {
      const payload = await recv();
      if (payload.newState === 'NOT_CONNECTED') {
        logger.info('disconnected');
        // Destroy the connector
        this.connector = None;

        // Execute the hooks
        this.onDisconnect();

        // Start reconnecting
        this.connect();
      } else if (payload.newState === 'CONNECTED') {
        logger.info('connection confirmed');
        this.onConnect();
      }
    }
  }

  private onDisconnect() {
    this.flowing = false;
    // function is called when the child connector drops
  }

  private onConnect() {
    this.flowing = true;
    // Flush the queue
  }

  private connect() {
    logger.info('attemptingConnection');
    this.connector = Some(
      new AMQPConnector(
        this.innerChannel,
        this.eventDefinitions,
        this.serviceName,
      ),
    );
  }

  // Returns if the message has been sent immediately or queued
  public async sendMessage(msg: Event<M>): Promise<boolean> {
    // Queue the messages if they can't be published immediately
    if (this.flowing) {
      return await this.connector.get().publish(msg);
    } else {
      this.queue.push(msg);
      return false;
    }
  }
}

// tslint:disable-next-line
class Serialization {
  // Maybe merge this class with AMQPConnector
  public static defToExchange(def: EventIdentifier) {
    return `event__${def.kind}-${def.namespace}`;
  }

  public static defToQueue(def: EventIdentifier, serviceName: string) {
    return `consumer__${def.kind}-${def.namespace}__${serviceName}`;
  }

  public static eventToMessage<T extends object>(
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
}

// tslint:disable-next-line
class AMQPConnector<M extends object> {
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
