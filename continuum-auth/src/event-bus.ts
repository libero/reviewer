import { RabbitEventBus } from '@libero/event-bus';
import { userLoggedInIdentifier } from '../../audit/src/events';

export const setupEventBus = async () => {
    const eventBus = await (new RabbitEventBus({url: 'amqp://localhost'}).init([userLoggedInIdentifier], 'continuum-auth'));

    return eventBus;
};
