// Abstract message queue

export type EventType = string; // e.g. "libero:audit:login"

export interface Event<T extends object> {
  // This is event metadata
  eventType: EventType;
  id: string; // Generated when the event is emitted
  created: Date;

  payload: T; // The actual data
  context?: unknown; // context about the event itself, including the actor that triggered the transmission of the event;
}

export interface EventPublisher {
  init(eventDefinitions: EventType[], serviceName: string): Promise<this>;

  publish<T extends object>(event: Event<T>): Promise<boolean>;
}

export interface EventSubscriber {
  init(eventDefinitions: EventType[], serviceName: string): Promise<this>;

  subscribe<P extends object>(eventDefinition: EventType, handler: (ev: Event<P>) => Promise<boolean>): void;
  // handler: returns weather or not we should ack the message
}

export interface EventBus extends EventPublisher, EventSubscriber {}

// Event handler type - has the event-bus injected into it
export type EventHandler<T extends object> = (arg0: EventBus) => (event: Event<T>) => Promise<boolean>;
