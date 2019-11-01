import fetch from 'node-fetch';
import { None } from 'funfix';
import { ProfilesService } from './profiles';

const { Response } = jest.requireActual('node-fetch');

jest.mock('node-fetch');
jest.mock('../logger');

describe('profiles', () => {
    afterEach(jest.resetAllMocks);

    it('fetchs a profile by id', async () => {
        const response = new Response('', { status: 200 });
        (fetch as jest.MockedFunction<typeof fetch>).mockReturnValue(Promise.resolve(response));

        const profilesService = new ProfilesService('http://profiles_service_url');
        await profilesService.getProfileById('profile-id');
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://profiles_service_url/profile-id');
    });

    it('returns none value in case of error', async () => {
        const response = new Response('', { status: 400 });
        (fetch as jest.MockedFunction<typeof fetch>).mockReturnValue(Promise.resolve(response));

        const profilesService = new ProfilesService('http://profiles_service_url');
        expect(await profilesService.getProfileById('profile-id')).toBe(None);
    });
});
