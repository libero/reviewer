import config from './config';
import { Option, None } from 'funfix';
import { verify, sign } from 'jsonwebtoken';
import { InfraLogger as logger } from './logger';

export const encode = (payload: object): string => {
    const {
        internal_jwt: { secret, expiresIn },
    } = config;
    logger.trace('jwtEncode');

    const token = sign(payload, secret, { expiresIn, issuer: 'continuum-auth' });

    return token;
};

export interface JournalAuthToken {
    iss: string;
    iat: number;
    exp: number;
    id: string;
    'new-session': boolean;
}

export const decodeJournalToken = (token: string): Option<JournalAuthToken> => {
    const {
        journal_jwt: { secret },
    } = config;
    // This needs to know about the journal secret in order to verify it. The two systems should use different tokens & secrets

    try {
        return Option.of(verify(token, secret) as JournalAuthToken);
    } catch (_) {
        logger.warn('invalidJournalJwt');
        return None;
    }
};
