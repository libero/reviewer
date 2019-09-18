// RabbitMQ user interface -- this file is a DRAFT
import { Option, None } from "funfix";
import { Connection } from "amqplib";
import { InfraLogger as logger } from "../logger";
import { debounce } from "lodash";
import { EventBus } from '../event-bus'

class RabbitEventBus implements EventBus {
  private transientInstance: Option<RabbitMqEventBusBackend> = None;
  private serviceName: string = "unnamed_service";
  private eventDefinitions: any[] = [];

  private consumerFunctions: Map<String, Function> = new Map();

  public constructor(subscriptions: Array<{eventDefinition: any, handler: any}>) {
    this.debouncedCreateTransientInstance();

    subscriptions.map((subscription) => {
      this.consumerFunctions.set("some_event", subscription.handler);
    })
  }

  // Make this into a factory method -- somehow?
  // How do we give the subscribers access to the event bus?
  public async subscribe(eventDefinition: any, handler: any) {
    this.consumerFunctions.set("some_event", handler);

    // Re-init the subscribers
    this.debouncedCreateTransientInstance();
  }

  public async publish(event: any) {
    return this.transientInstance.map((transient) => {
      return transient.publish(event);
    }).getOrElseL(() => {
      setTimeout(() => {
        this.publish(event);
      }, 1000);
    })
  }

  private debouncedCreateTransientInstance = debounce(
    async function() {
      this.transientInstance = None; // Lock the transientInstance?

      // Create a new transientInstance
      this.transientInstance = Some(
        new RabbitEventBusConnected(
          amqplib.connect({
            protocol: 'amqp',
            host:'rabbitmq',
            username: "guest",
            password: "guest",
            heartbeat: 1,
          }),
          this.debouncedCreateTransientInstance()
        )
      );

      // Register it's subscribers
      this.consumerFunctions.forEach(async (key, value, map) => {
        await this.transientInstance.map(async (transient) => {
          await transient.subscribe(key, value);
        })
      }))
    },
    500,
    { leading: false }
  );
}

// This is a transient class, it contains the connection and will kill it's self if the
// connection dies or errors
// One class per file
class RabbitEventBusConnected {
  private connection: Connection;
  private errorCallback: Function;

  public constructor(connection: Connection, errorCallback: Function) {
    this.connection = connection;

    // This provides a way of cleanly closing the connection and attempting to reconnect
    this.errorCallback = errorCallback;
  }

  public async subscribe(event_queue_name: string, handler: Function) {
    // Handle the subscription to the server, knowing that when the connection drops, this will disappear
    // BAsICALLy copypasta the function in index.ts
    console.log("scrubscribing");
  }

  public async publish(event: any) {
    console.log("publishing");
  }

  private onError() {
    // Register this handler with each channel that's created
    logger.error("RabbitEventBusConnected died.");
    this.errorCallback();
  }

  private async createChannel() {
    const channel = this.connnection.createChannel();
    channel.on("error", this.onError);
  }
}
