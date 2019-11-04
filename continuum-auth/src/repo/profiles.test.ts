import fetch from 'node-fetch';
import { None } from 'funfix';
import { ProfilesService } from './profiles';
import { InfraLogger as logger } from '../logger';

const { FetchError, Response } = jest.requireActual('node-fetch');

jest.mock('node-fetch');
jest.mock('../logger');

describe('profiles', () => {
    beforeEach(() => jest.resetAllMocks());

    it('fetchs a profile by id', async () => {
        (fetch as jest.MockedFunction<typeof fetch>).mockReturnValue(
            Promise.resolve(new Response('{"id": "profile-id1"}', { status: 200 })),
        );

        const profile = await new ProfilesService('http://profiles_service_url')
            .getProfileById('profile-id1')
            .then(data => {
                return data.value;
            });
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://profiles_service_url/profile-id1');
        expect(logger.trace).toHaveBeenCalledTimes(2);
        expect(logger.trace).toHaveBeenNthCalledWith(1, 'lookupProfile', { profileId: 'profile-id1' });
        expect(logger.trace).toHaveBeenNthCalledWith(2, 'lookupProfileOk', { profileId: 'profile-id1' });
        expect(profile).toEqual(JSON.parse('{"id": "profile-id1"}'));
    });

    it('returns none value in case of bad response', async () => {
        (fetch as jest.MockedFunction<typeof fetch>).mockReturnValue(
            Promise.resolve(new Response('{}', { status: 400 })),
        );

        const data = await new ProfilesService('http://profiles_service_url').getProfileById('profile-id2');
        expect(logger.trace).toHaveBeenCalledTimes(3);
        expect(logger.trace).toHaveBeenNthCalledWith(1, 'lookupProfile', { profileId: 'profile-id2' });
        expect(logger.debug).toHaveBeenNthCalledWith(2, 'httpFetchErrorCode', { error: 400, msg: 'Bad Request' });
        expect(logger.debug).toHaveBeenNthCalledWith(3, 'lookupProfileError', {
            e: new Error('Bad Request'),
            profileId: 'profile-id2',
        });
        expect(data).toBe(None);
    });

    it('returns none value in case of none json response', async () => {
        (fetch as jest.MockedFunction<typeof fetch>).mockReturnValue(
            Promise.resolve(new Response('not json', { status: 200 })),
        );

        const data = await new ProfilesService('http://profiles_service_url').getProfileById('profile-id3');
        expect(logger.trace).toHaveBeenCalledTimes(3);
        expect(logger.trace).toHaveBeenNthCalledWith(1, 'lookupProfile', { profileId: 'profile-id3' });
        expect(logger.trace).toHaveBeenNthCalledWith(2, 'lookupProfileOk', { profileId: 'profile-id3' });
        expect(logger.debug).toHaveBeenNthCalledWith(3, 'lookupProfileError', {
            e: new FetchError('invalid json response body at  reason: Unexpected token o in JSON at position 1', ''),
            profileId: 'profile-id3',
        });
        expect(data).toBe(None);
    });
});
