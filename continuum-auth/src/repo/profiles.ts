// Connector to the profiles service
import { InfraLogger as logger } from '../logger';
import fetch from 'node-fetch';
import { Option } from 'funfix';
import { checkStatus } from '../utils';

// Eventually these interfaces will be moved to domainland
export interface ProfilesRepo {
    getProfileById(string): Promise<Option<UserProfile>>;
}

export interface UserProfile {
    id: string;
    orcid: string;
    name: {
        preferred: string;
        index: string;
    };
    emailAddresses: Array<{
        value: string;
    }>;
}

export class ProfilesService implements ProfilesRepo {
    private url: string;

    constructor(url: string) {
        this.url = url;
        logger.info('profilesConnectorInit');
    }

    private makeProfileUrl(profileId: string): string {
        return `${this.url}/${profileId}`;
    }

    public async getProfileById(profileId: string): Promise<Option<UserProfile>> {
        logger.trace('lookupProfile', { profileId });

        return Option.of(
            await fetch(this.makeProfileUrl(profileId))
                .then(checkStatus)
                .then(queryResponse => {
                    logger.trace('lookupProfileOk', { profileId });
                    return queryResponse.json();
                })
                .catch(e => {
                    logger.debug('lookupProfileError', { profileId, e });
                    return undefined;
                }),
        );
    }
}
