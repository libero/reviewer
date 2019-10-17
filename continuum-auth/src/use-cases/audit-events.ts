/**
 * NOTE: this is copied from audit service event definitions.
 * These should be moved to a common package
 */

import { EventType } from '@libero/event-bus';

export interface UserLoggedInPayload {
    name: string;
    userId: string;
    email: string;
    timestamp: Date;
}

export const userLoggedInIdentifier: EventType = 'libero:audit:user:LoggedIn';
