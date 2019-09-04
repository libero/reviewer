// Abstract message queue

export type EventType = string;

export interface Event<T extends object>{
  // This is event metadata
  id: string; // Generated when the event is emitted
  created: Date;
  source: string; // Some identifier for the source server

  kind: EventType; // Used by the messaging exchange
  payload: T; // The actual data
}

export interface MessageQueue {
  init(): Promise<void>;

  publish<T extends object>(event: Event<T>): Promise<boolean>;
  subscribe<T extends object>(event_type: EventType, handler: (ev: Event<T>)=>Promise<boolean>): void;
  // handler: returns weather or not we should ack the message
}
