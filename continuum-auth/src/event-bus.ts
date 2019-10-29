import { RabbitEventBus, EventConfig } from '@libero/event-bus';
import { LiberoEventType } from '@libero/libero-events';

export const setupEventBus = async (config: EventConfig) => {
    const url = `amqp://${ config.url }`;
    const eventBus = await (new RabbitEventBus({url}).init([LiberoEventType.userLoggedInIdentifier], 'continuum-auth'));
    return eventBus;
};
