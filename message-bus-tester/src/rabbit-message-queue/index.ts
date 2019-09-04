import { MessageQueue, Event } from '../message-queue';

class RabbitMessageQueue implements MessageQueue {
  public async init() {
    // This is where we setup the queue structure in RabbitMQ
  }

  public async publish<T extends object>(event: Event<T>): Promise<boolean> {
    // Publishes an event to it's queue
    return false;
  }

  public async subscribe<T extends object>(event_type: string, handler: (ev: Event<T>) => Promise<boolean>) {
    // Runs the handler function on any event that matches that type

  }

}
