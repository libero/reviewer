import { EventBus, EventType, Event, EventHandler } from "../event-bus";
import { Option, None, Some } from "funfix";

export type AnyEvent = Event<object>;
export type AnyHandler = (ev: AnyEvent) => Promise<boolean>;

/**
 * Mocks out the EventBus for use in tests.
 *
 * @export
 * @class MockEventBus
 * @implements {EventBus}
 */
export class MockEventBus implements EventBus {
  private queues: Option<Map<string, AnyHandler>> = None;

  public async init(defs: EventType[], serviceName: string): Promise<this> {
    this.queues = Some(new Map());
    return this;
  }

  /**
   * Allows the MockEventBus to publish any event of type Event<T>
   *
   * @template T
   * @param {T} event
   * @returns {Promise<boolean>}
   * @memberof MockEventBus
   */
  public async publish<T extends object>(event: Event<T>): Promise<boolean> {
    console.log(`Publish ${JSON.stringify(event)}`);

    return this.queues
      .flatMap(queues => Option.of(queues.get(`${event.eventType}`)))
      .map(fn => {
        return fn(event);
      })
      .getOrElse(false);
  }

  /**
   * Allows the MockEventBus to subscribe any event of type Event<T>
   *
   * @template T
   * @param {EventType} eventType
   * @param {(event: T) => Promise<boolean>} handler
   * @memberof MockEventBus
   */
  public async subscribe<T extends object>(
    eventType: EventType,
    handler: (event: Event<T>) => Promise<boolean>
  ) {
    console.log(`Subscribe ${eventType}`);
    this.queues.get().set(`${eventType}`, handler);
  }
}
