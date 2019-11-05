import fetch from 'node-fetch';
import { None } from 'funfix';
import { ProfilesService } from './profiles';

const { Response } = jest.requireActual('node-fetch');

jest.mock('node-fetch');
jest.mock('../logger');

describe('profiles', () => {
    it('fetchs a profile by id', async () => {
        (fetch as jest.MockedFunction<typeof fetch>).mockReturnValue(
            Promise.resolve(new Response('{"id": "profile-id1"}', { status: 200 })),
        );

        const profile = await new ProfilesService('http://profiles_service_url').getProfileById('profile-id1');
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://profiles_service_url/profile-id1');
        expect(profile.get().id).toEqual('profile-id1');
    });

    it('returns none value in case of bad response', async () => {
        (fetch as jest.MockedFunction<typeof fetch>).mockReturnValue(
            Promise.resolve(new Response('{}', { status: 400 })),
        );

        const data = await new ProfilesService('http://profiles_service_url').getProfileById('profile-id2');
        expect(data).toBe(None);
    });

    it('returns none value in case of none json response', async () => {
        (fetch as jest.MockedFunction<typeof fetch>).mockReturnValue(
            Promise.resolve(new Response('not json', { status: 200 })),
        );

        const data = await new ProfilesService('http://profiles_service_url').getProfileById('profile-id3');
        expect(data).toBe(None);
    });
});
