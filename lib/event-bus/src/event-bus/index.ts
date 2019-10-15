// Abstract Message Queue - types and interfaces

export type EventType = string;   // e.g. "libero:user-action:login"

export interface Event<T extends object> {
  eventType: EventType;   // see above
  id: string;             // Generated when the event is emitted
  created: Date;
  payload: T;             // The actual data
  version?: number;        // Version of the payload
  context?: unknown;      // context about the event itself, including the actor
                          // that triggered the transmission of the event;
}

export interface EventPublisher {
  init(eventDefinitions: EventType[], serviceName: string): Promise<this>;
  publish<T extends object>(event: Event<T>): Promise<boolean>;
}

export interface EventSubscriber {
  init(eventDefinitions: EventType[], serviceName: string): Promise<this>;
  // handler: returns whether or not we should ack the message
  subscribe<T extends object>(eventType: EventType, handler: (event: Event<T>) => Promise<boolean>): void;
}

// Interface needed to be fulfilled in order to be used as an EventBus
export interface EventBus extends EventPublisher, EventSubscriber {}
