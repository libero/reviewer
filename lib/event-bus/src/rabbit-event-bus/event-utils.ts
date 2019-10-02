import { Event, EventIdentifier } from '../event-bus';
import { MessageWrapper } from './types';
import { Option } from 'funfix';

export class EventUtils {
  // Maybe merge this class with AMQPConnector
  public static defToExchange(def: EventIdentifier) {
    return `event__${def.kind}-${def.namespace}`;
  }

  public static defToQueue(def: EventIdentifier, serviceName: string) {
    return `consumer__${def.kind}-${def.namespace}__${serviceName}`;
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
