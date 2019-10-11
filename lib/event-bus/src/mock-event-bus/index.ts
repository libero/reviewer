import {
  EventPublisher,
  EventSubscriber,
  EventType,
  Event,
} from '../event-bus';
import { Option, None, Some } from 'funfix';

export class MockEventBus implements EventPublisher, EventSubscriber {
  private queues: Option<
    Map<string, (ev: Event<object>) => Promise<boolean>>
  > = None;

  public async init(
    defs: EventType[],
    serviceName: string,
  ): Promise<this> {
    this.queues = Some(new Map());
    return this;
  }

  public async publish<T extends object>(event: Event<T>): Promise<boolean> {
    return this.queues
      .flatMap(queues =>
        Option.of(queues.get(`${event.eventType}`)),
      )
      .map(fn => {
        return fn(event);
      })
      .getOrElse(false);
  }

  public async subscribe<P extends object>(
    eventType: EventType,
    handler: (ev: Event<P>) => Promise<boolean>,
  ) {
    this.queues.get().set(`${eventType}`, handler);
  }
}
