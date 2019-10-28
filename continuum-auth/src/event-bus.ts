import { RabbitEventBus, EventBus } from '@libero/event-bus';
import { userLoggedInIdentifier } from '@libero/libero-events';

export const setupEventBus = async (): Promise<EventBus> => {
    const eventBus = await new RabbitEventBus({ url: 'amqp://localhost' }).init(
        [userLoggedInIdentifier],
        'continuum-auth',
    );

    return eventBus;
};
