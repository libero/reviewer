import { Sender, Receiver, Channel, channel } from 'rs-channel-node';
import { Option, None, Some } from 'funfix';
import { Connection } from 'amqplib';
import * as amqplib from 'amqplib';
import { InfraLogger as logger } from '../logger';
import { EventIdentifier, Event } from '../event-bus';
import { StateChange } from './types';
import { Serialization } from './Serializer';
import { AMQPConnector } from './AMQPConnector';

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

    this.queue
      // Create a new array so we don't mutate the queue as we iterate over it
      // (which would lead to undefined behaviour)
      .map(() => undefined)
      .forEach(() => {
        Option.of(this.queue.shift()).map(item => this.sendMessage(item));
      });
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
