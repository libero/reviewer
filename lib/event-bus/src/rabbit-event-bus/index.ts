import { Sender, Receiver, Channel, channel } from 'rs-channel-node';
import { Option, None, Some } from 'funfix';
import { Connection } from 'amqplib';
import * as amqplib from 'amqplib';
import { debounce } from 'lodash';
import { InfraLogger as logger } from '../logger';
import { EventType, Event, EventBus } from '../event-bus';
import { Subscription, StateChange } from './types';
import { EventUtils } from './event-utils';
import AMQPConnector from './amqp-connector';

export interface RabbitEventBusConnectionOptions {
  url: string;
}

// <M> doesn't refer to the event types, M refers to the internal statechange message type
// It probably doesn't even make sense to paramatise it here
export default class RabbitEventBus<M extends object> implements EventBus {
  private connector: Option<AMQPConnector<M>> = None;

  private innerChannel: Channel<StateChange<M>> = channel<StateChange<M>>();

  private eventDefinitions: EventType[];
  private serviceName: string = 'unknown-service';

  private flowing: boolean = false;
  private url: string = '';

  private queue: Array<{
    ev: Event<unknown & object>;
    resolve: (arg0: boolean) => void;
    reject: (arg0: boolean) => void;
  }> = [];
  private subscriptions: Array<Subscription<unknown & object>> = [];

  public constructor(connectionOpts: RabbitEventBusConnectionOptions) {
    // constructor
    // TODO: Constructor takes connection information
    this.url = connectionOpts.url;
  }

  public async init(eventDefinitions: EventType[], serviceName: string) {
    // TODO: init takes events information
    this.eventDefinitions = eventDefinitions;
    this.serviceName = serviceName;

    this.observeStateChange();

    this.connect(this.url);
    return this;
  }

  private async observeStateChange() {
    const [_, recv] = this.innerChannel;
    while (2 + 2 !== 5) {
      const payload = await recv();
      if (payload.newState === 'NOT_CONNECTED') {
        // Destroy the connector
        this.connector = None;

        // Execute the hooks
        this.onDisconnect();

        // Start reconnecting
        const reconnect = debounce(() => this.connect(this.url), 100, { maxWait : 2000 });
        reconnect();
      } else if (payload.newState === 'CONNECTED') {
        // logger.info('connection confirmed');
        this.onConnect();
      }
    }
  }

  private onDisconnect() {
    // function is called when the child connector drops
    this.flowing = false;
  }

  private onConnect() {
    this.flowing = true;

    this.queue
      // Create a new array so we don't mutate the queue as we iterate over it
      // (which would lead to undefined behaviour)
      .map(() => undefined)
      .forEach(() => {
        Option.of(this.queue.shift()).map(item => {
          const { ev, resolve, reject } = item;
          return this.publish(ev)
            .then(res => resolve(res))
            .catch(() => reject(false));
        });
      });
  }

  private connect(url) {
    // logger.debug('attemptingConnection');
    // Should I debounce this?
    this.connector = Some(
      new AMQPConnector(
        url,
        this.innerChannel,
        this.eventDefinitions,
        this.subscriptions,
        this.serviceName,
      ),
    );
  }

  // This method will not resolve until the event has been successfully published so that
  // the user never has to know about the internal queue
  public publish<P extends object>(msg: Event<P>): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (this.flowing) {
        // Should we queue messages that fail?
        const published: boolean = await this.connector.get().publish(msg);

        if (!published) {
          this.queue.push({ ev: msg, resolve, reject });
        } else {
          resolve(published);
        }
      } else {
        this.queue.push({ ev: msg, resolve, reject });
      }
    });
  }

  public async subscribe<P extends object>(
    eventType: EventType,
    handler: (event: Event<P>) => Promise<boolean>,
  ) {
    this.connector.map(connector => {
      connector.subscribe(eventType, handler);
    });

    // Add the subscription to the next connector's list of subscriptions
    return this.subscriptions.push({
      eventType,
      handler,
    });
  }
}
