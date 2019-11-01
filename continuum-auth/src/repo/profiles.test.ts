import { ProfilesService } from './profiles';
import fetch from 'node-fetch';

jest.mock('node-fetch');
jest.mock('../logger');

describe('profiles', () => {
    it('fetchs a profile by id', () => {
        const profilesService = new ProfilesService('http://profiles_service_url');
        profilesService.getProfileById('profile-id');
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://profiles_service_url/profile-id');
    });
});