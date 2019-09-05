import { MessageQueue, EventIdentifier, Event } from '../message-queue';

export class MockMessageQueue implements MessageQueue {
  public async init(defs: EventIdentifier[]): Promise<this> {
    return this;
  }

  public async publish<T extends object>(event: Event<T>): Promise<boolean> {
    return false;
  }

  public async subscribe<P extends object>(
    event_identifier: EventIdentifier,
    handler: (ev: Event<P>) => Promise<boolean> ) {

  }
}
