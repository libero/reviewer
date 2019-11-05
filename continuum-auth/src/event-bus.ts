import { RabbitEventBus, EventConfig, EventBus } from '@libero/event-bus';
import { LiberoEventType } from '@libero/event-types';

export const setupEventBus = async (config: EventConfig): Promise<EventBus> => {
    const url = `amqp://${config.url}`;
    const eventBus = await new RabbitEventBus({ url }).init([LiberoEventType.userLoggedInIdentifier], 'continuum-auth');
    return eventBus;
};
