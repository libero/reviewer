// Abstract message queue

export type EventType = string;

export interface EventIdentifier {
  kind: EventType; // For event type
  namespace: string; // For origin/domain?
}

export interface Event<T extends object> extends EventIdentifier{
  // This is event metadata
  id: string; // Generated when the event is emitted
  created: Date;

  payload: T; // The actual data
}

class ServiceStartedEvent implements Event<{}> {
  id: string;
  created: Date;
  payload: {};
  kind: string; 
  namespace: string;

  constructor(kind: EventType, namespace: string) {
    this.id = "some-event-id";
    this.created = new Date();
    this.kind = kind;
    this.namespace= namespace
  }

  public static fromIdentifier(id: EventIdentifier) {
    return new this(id.kind, id.namespace);
  }
}

type EventPayload = {
  x: number;
  y: number;
}

const thing: Event<EventPayload>= {
  id: "",
  created: new Date(),
  payload: {x: 10, y: 10},
  kind: "something",
  namespace: "something_else"
}


// const service_started_event_def: EventIdentifier = { kind: "ServiceStarted", namespace: "infra" };
// 
// const ev = ServiceStartedEvent.fromIdentifier(service_started_event_def);
// 
// const mq = {} as any;
// 
// mq.publish(ev);
// 
// // mq.subcribe<{}>(service_started_event_def, (_) => /{
// console.log("got a thing");
// });



export interface MessageQueue {
  init(event_definitions: EventIdentifier[]): Promise<this>;

  publish<T extends object>(event: Event<T>): Promise<boolean>;
  subscribe<P extends object>(event_definition: EventIdentifier, handler: (ev: Event<P>)=>Promise<boolean>): void;
  // handler: returns weather or not we should ack the message
}
