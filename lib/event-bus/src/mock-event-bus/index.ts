import {
  EventPublisher,
  EventSubscriber,
  EventIdentifier,
  Event,
} from '../event-bus';
import { InfraLogger as logger } from '../logger';
import { Option, None, Some } from 'funfix';

export class MockEventBus implements EventPublisher, EventSubscriber {
  private queues: Option<
    Map<string, (ev: Event<object>) => Promise<boolean>>
  > = None;

  public async init(
    defs: EventIdentifier[],
    serviceName: string,
  ): Promise<this> {
    this.queues = Some(new Map());
    return this;
  }

  public async publish<T extends object>(event: Event<T>): Promise<boolean> {
    return this.queues
      .flatMap(queues =>
        Option.of(queues.get(`${event.namespace}-${event.kind}`)),
      )
      .map(fn => {
        return fn(event);
      })
      .getOrElse(false);
  }

  public async subscribe<P extends object>(
    { kind, namespace }: EventIdentifier,
    handler: (ev: Event<P>) => Promise<boolean>,
  ) {
    this.queues.get().set(`${namespace}-${kind}`, handler);
  }
}
