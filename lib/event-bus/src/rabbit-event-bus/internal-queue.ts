import { Event, EventPublisher } from '../event-bus';
import { Option } from 'funfix';

export interface QueuedEvent {
  event: Event<unknown & object>;
  resolve: (arg0: boolean) => void;
  reject: (arg0: boolean) => void;
}

export class InternalMessageQueue {
  private publisher: EventPublisher;

  private queue: QueuedEvent[] = [];

  constructor(publisher: EventPublisher) {
    this.publisher = publisher;
  }

  public publishQueue() {
    this.queue
      // Create a new array so we don't mutate the queue as we iterate over it
      // (which would lead to undefined behaviour)
      .map(() => undefined)
      .forEach(() => {
        Option.of(this.queue.shift()).map(item => {
          const { event, resolve, reject } = item;
          return this.publisher.publish(event)
            .then(res => resolve(res))
            .catch(() => reject(false));
        });
      });
  }

  public push(object: QueuedEvent) {
    this.queue.push(object);
  }

  public get length() {
    return this.queue.length;
  }
}
