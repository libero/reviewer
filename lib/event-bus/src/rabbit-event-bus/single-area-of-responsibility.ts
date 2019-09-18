// The thing Peter & Peter discussed
import EventEmitter from 'events';
import { Connection } from 'amqplib';

// Responsible for managing the state of (can I do the thing, can't I do the thing)
class RabbitEventBus { 
	private publishingBlocked = true;

	// Listen to the following events
	// - READY - emitted by the connection manager, when it's ready to accept incoming data
	// - NOT_READY - "
}

// Responsible for managing the state of the connection, and reconnecting the
// other class
class EventBusConnectionManager {
	private internalEvents: EventEmitter;
	private busConnectorEvents: EventEmitter;
	private busConnector: RabbitEventBusConnector;
	private busConnectorState: string = "NOT_STARTED";

	private subscriptions: Set<string> = new Set();
	private pendingSubscriptions: Set<string> = new Set();

	public constructor() {
		this.internalEvents = new EventEmitter();

		this.busConnector = new RabbitEventBusConnector(this.internalEvents);
		this.busConnectorEvents = this.busConnector.getEventEmitter();

		this.busConnectorEvents.on('event_recv', (event) => {
			// Simulate recieving an event from the consumer
			console.log('event', evnet);
		})

		this.busConnectorEvents.on('subscribed', (event) => {
			if(this.pendingSubscriptions.has(event.event_name)) {
				this.pendingSubscriptions.delete(event.event_name);
				this.subscriptions.add(event.event_name);
				this.state = "READY"
			}
		})

		this.busConnectorEvents.on('connection_error', (event) => {
			this.busConnector = undefined;
			this.state = "DEGRADED";
			// emit stateChanged event to parent
			// this.parentEmitter.emit('not_ready');
		})
	}

	public subscribe(event_name: string) {
		this.busConnectorEvents.emit('subscribe', {event_name});
		this.pendingSubscriptions.add(event_name);
		this.state = "WAITING"
	}

}

// Responsible for making amqp protocol calls to the rabbitmq server
class RabbitEventBusConnector {
	private internalEvents: EventEmitter;
	private connection: Connection;

	public constructor(connection: Connection) {
		this.internalEvents = new EventEmitter();

		this.internalEvents.on('publish', (event) => {});
		this.internalEvents.on('subscribe', (event) => {
			// Do a thing with this class' internal event emitter
			setInterval(() => {
				// Simulate events coming in
				this.internalEvents.emit('event_recv', {event});
			}, 2000);
			this.internalEvents.emit('subscribed', {event});
		});

		this.connection.on('error', () => {
			this.internalEvents.emit('connection_error', {});
		});
	}

	getEventEmitter() {
		return this.internalEvents;
	}

}
