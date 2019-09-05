import { MessageQueue, EventIdentifier, Event } from "../message-queue";
import { InfraLogger as logger } from "../logger";
import { Option, None, Some } from "funfix";

export class MockMessageQueue implements MessageQueue {
  private queues: Option<Map<string, (ev: Event<any>) => Promise<boolean>>> = None;

  constructor() {
    this.queues = Some(new Map());
  }

  public async init(defs: EventIdentifier[]): Promise<this> {
    // Create queues in the map
    return this;
  }

  public async publish<T extends object>(event: Event<T>): Promise<boolean> {
    return Option.of(this.queues.get().get(`${event.namespace}-${event.kind}`))
      .map(fn => {
        return fn(event);
      })
      .getOrElse(false);
  }

  public async subscribe<P extends object>(
    { kind, namespace }: EventIdentifier,
    handler: (ev: Event<P>) => Promise<boolean>
  ) {
    this.queues.get().set(`${namespace}-${kind}`, handler);
  }
}
