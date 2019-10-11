import { Event, EventType } from '../event-bus';
import { MessageWrapper } from './types';
import { Option } from 'funfix';

export class EventUtils {
  // Maybe merge this class with AMQPConnector
  public static eventTypeToExchange(eventType: EventType) {
    return `event__${eventType}`;
  }

  public static eventTypeToQueue(eventType: EventType, serviceName: string) {
    return `consumer__${eventType}__${serviceName}`;
  }

  public static eventToMessage<T extends object>(
    event: Event<T>,
  ): MessageWrapper<Event<T>> {
    // Wrap the event in some internal transport layer format, in effect transforming the
    // event into a message
    return {
      event,
      meta: {
        attempts: 0, // increments each process
        retries: 10, // total retries
        failures: 0, // increments each failure
      },
    };
  }

  public static messageToEvent<T extends object>(
    message: MessageWrapper<Event<T>>,
  ): Option<Event<T>> {
    return Option.of(message.event);
  }
}
