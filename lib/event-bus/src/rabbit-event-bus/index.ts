import { Channel, channel } from 'rs-channel-node';
import { Option, None, Some } from 'funfix';
import { debounce } from 'lodash';
import { EventType, Event, EventBus } from '../event-bus';
import { Subscription, StateChange } from './types';
import AMQPConnector from './amqp-connector';
import { InternalMessageQueue, QueuedEvent } from './internal-queue';

export interface RabbitEventBusConnectionOptions {
  url: string;
}

/**
 *
 *
 * @export
 * @class RabbitEventBus
 * @implements {EventBus}
 */
export default class RabbitEventBus implements EventBus {
  private connector: Option<AMQPConnector> = None;

  private innerChannel: Channel<StateChange> = channel<StateChange>();

  private eventDefinitions: EventType[];
  private serviceName: string = 'unknown-service';

  private flowing: boolean = false;
  private url: string = '';
  private queue : InternalMessageQueue;
  private subscriptions: Array<Subscription<unknown & object>> = [];

  public constructor(connectionOpts: RabbitEventBusConnectionOptions) {
    this.url = connectionOpts.url;
  }

  public async init(eventDefinitions: EventType[], serviceName: string) {
    this.eventDefinitions = eventDefinitions;
    this.serviceName = serviceName;
    this.queue = new InternalMessageQueue(this);
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

  private onDisconnect() { this.flowing = false; }

  private onConnect() {
    this.flowing = true;
    this.queue.publishQueue();
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
        const qEvent : QueuedEvent = { event: msg, resolve, reject };
        this.queue.push(qEvent);
        } else {
          resolve(published);
        }
      } else {
        const qEvent : QueuedEvent = { event: msg, resolve, reject };
        this.queue.push(qEvent);
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
