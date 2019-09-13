# `event-bus`

> This will provide common types and implementation for connecting to our glorious message bus

## RabbitMQ Implementation 

This module provices an implementation of an event bus that allows multiple types of services to subscribe to an event type that is broadcast by other services. This is designed to provide decoupling between services
through asynchronous messaging thus allowing for services to trigger effects in other services and domains without requiring a response.

This gives us a few advantages:
- Services don't need to know anything about one another, and can be deployed separately (if a service is down when something else sends it a message, the messages are just queued up and executed when the service
becomes available)
- External integrators can introduce new services by listening to events (but more on that later).
- The infrastructure is more scalable, the platform is built on top of RabbitMQ, which is rated to handle [millions of messages per second](https://content.pivotal.io/blog/rabbitmq-hits-one-million-messages-per-second-on-google-compute-engine) and all the other services are stateless, so can be scaled horizontally easily.

The following diagram is the RabbitMQ structure that we use to support this infrastructure. It's defined and applied at runtime by this library transparently to the user.
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

### External integrations
One example of a subsystem that requires external integrations is the export domain. The variety of existing systems libero will need to interact with means that we can't just provide one
export system, like our current MECA export system, as some users will need to export into other data structures to support their existing infrastructure.
The way we plan on supporting this is by introducing an <kbd>export-manager</kbd> service that listens for `exportRequested` events. The <kbd>export-manager</kbd> service is configured to 
emit other events when it receives `exportRequested` events. So when it receives a `exportRequested` event for a particular journal, it will emit one or more specialised events, such as `beginMecaExport` for
services such as <kbd>meca-exporter</kbd> to respond to, once <kbd>meca-exporter</kbd> has finished exporting, it'll emit a `exportSuccessful` event. The submission service doesn't care about how the 
submission is exported, it only cares about if it has been exported, so it listens for `exportSuccessful` events, which it uses to update it's internal submission state to keep track of the number of
successful exports.


## Integration with Pubsweet
During the August 2019 PubSweet Meet, we discussed how to share types and interfaces across projects, and
how that would then enable us to share components with other systems built on top of event buses.

This package (currently) contains both these types and a couple of implementations of the interfaces, the plan is to move the definition of the interface (i.e. the contents `src/event-bus`) to within PubSweet so other projects can reuse existing implementations of the event-bus.

There's more detail about this here:
- [PubSweet MR](https://gitlab.coko.foundation/pubsweet/pubsweet/merge_requests/593#note_40573)
- [PubSweet 'epic' ticket](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/461)
- [Repo Link](http://example.com) (TODO: we need to make a new repo)
