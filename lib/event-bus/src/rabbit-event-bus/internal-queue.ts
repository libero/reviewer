import { Event, EventBus } from '../event-bus';
import { Option } from 'funfix';

export type QueuedEvent = {
  event: Event<unknown & object>;
  resolve: (arg0: boolean) => void;
  reject: (arg0: boolean) => void;
};

export class InternalMessageQueue {
  private publisher: EventBus;

  private queue: Array<QueuedEvent> = [];

  constructor(publisher: EventBus) {
    this.publisher = publisher;
  }

  publishQueue() {
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

  push(object: QueuedEvent) {
    this.queue.push(object);
  }
};
