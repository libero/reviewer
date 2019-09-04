# Message Bus Testing Service

Eventually this is going to turn into our message bus library, which will eventually
implement the pubsweet message bus interface.

But for a first revision, it's going to be a very simple http service
with a well abstracted message bus client/adapter thing.

This project is also going to define how the message bus is structured, at the moment, I'm thinking that it should look like this, given that we're going to implement it on top of rabbitmq:
```
               Event Queue                      Service Worker
+-----------+                   +----------+    Queue              +---------------------+
|           |  +-------------+  |          |                       |                     |
| Event     +-->|||||||||||||+--> Event    |    +-------------+    | Worker Pool         |
| Producers |  +-------------+  | Exchange +--->+|||||||||||||+----> (Service A Cluster) |
|           |                   | (fanout) |    +-------------+    |                     |
+-----------+                   +----+-----+                       |                     |
                                     |                             +---------------------+
                                     |
                                     |          Service Worker
                                     |          Queue              +---------------------+
                                     |                             |                     |
                                     |          +-------------+    | Worker Pool         |
                                     +--------->+|||||||||||||+----> (Service B Cluster) |
                                                +-------------+    |                     |
                                                                   |                     |
                                                                   +---------------------+
```

Things to notice about this diagram:
- Each kind of service has one queue. This follows the 'worker' pattern where when each instance of a service picks an event from the queue that event is consumed and the other instances of that service no longer have access to it. This requires the services to be completely stateless otherwise there will be some serious inconsistencies.
- This architecture is not intended to provide "request-response" functionality across services. That's bad, it introduces coupling between services. If you expect a message queue to do that, you're probably doing something wrong.
- **Each type of service has it's own queue for each type of event**

This will be abstracted to the following interface:

```typescript
type EventType = string;

interface Event<T>{
  // This is event metadata
  id: string;
  created: Date;
  source: string;
  payload: T;
}

interface MessageQueue {
  init(): Promise<void>;

  publish(event: Event): Promise<bool>;
  subscribe(event_type: EventType, handler: (ev: Event)=>Promise<bool>): void;
}
```
This will eventually need to be synchronised with the interface that's going to be contributed to pubsweet so we can contribue this component back upstream.
