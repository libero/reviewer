import { EventBus, EventType, Event } from '../event-bus';
import { Option, None, Some } from 'funfix';

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

  public async init(
    // tslint:disable-next-line: variable-name
    _defs: EventType[],
    // tslint:disable-next-line: variable-name
    _serviceName: string,
  ): Promise<this> {
    this.queues = Some(new Map());
    return this;
  }

  /**
   * Allows the MockEventBus to publish any event of type Event<T>
   *
   * @template T - The payload for the event
   * @param {T} event - Of type Event<T>, where T is the payload
   * @returns {Promise<boolean>}
   * @memberof MockEventBus
   */
  public async publish<T extends object>(event: Event<T>): Promise<boolean> {
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
   * @template T - The payload for the event
   * @param {EventType} eventType
   * @param {(event: T) => Promise<boolean>} handler  - Function of type (event: Event<T>) => Promise<boolean> where T is the payload
   * @memberof MockEventBus
   */
  public async subscribe<T extends object>(
    eventType: EventType,
    handler: (event: Event<T>) => Promise<boolean>,
  ) {
    this.queues.get().set(`${eventType}`, handler);
  }
}
