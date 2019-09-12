// Abstract message queue

export type EventType = string;

export interface EventIdentifier {
  kind: EventType; // For event type
  namespace: string; // For origin/domain?
}

export interface Event<T extends object> extends EventIdentifier {
  // This is event metadata
  id: string; // Generated when the event is emitted
  created: Date;

  payload: T; // The actual data
  context?: unknown; // context about the event itself, including the actor that triggered the transmission of the event;
}

export interface EventPublisher {
  init(eventDefinitions: EventIdentifier[], serviceName: string): Promise<this>;

  publish<T extends object>(event: Event<T>): Promise<boolean>;
}

export interface EventSubscriber {
  init(eventDefinitions: EventIdentifier[], serviceName: string): Promise<this>;

  subscribe<P extends object>(eventDefinition: EventIdentifier, handler: (ev: Event<P>) => Promise<boolean>): void;
  // handler: returns weather or not we should ack the message
}
