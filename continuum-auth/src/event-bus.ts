import { RabbitEventBus } from '@libero/event-bus';
import { userLoggedInIdentifier } from './use-cases/audit-events';

export const setupEventBus = async () => {
    const eventBus = await (new RabbitEventBus({url: 'amqp://localhost'}).init([userLoggedInIdentifier], 'continuum-auth'));

    return eventBus;
};
