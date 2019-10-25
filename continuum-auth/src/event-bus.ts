import { RabbitEventBus } from '@libero/event-bus';
import { userLoggedInIdentifier } from '@libero/libero-events';

export const setupEventBus = async () => {
    const eventBus = await (new RabbitEventBus({url: 'amqp://localhost'}).init([userLoggedInIdentifier], 'continuum-auth'));

    return eventBus;
};
