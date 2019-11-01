import { ProfilesService } from './profiles';

describe('profiles', () => {
    it.skip('fetchs a profile by id', () => {
        const profilesService = new ProfilesService('http://profiles_service_url');
        const profile = profilesService.getProfileById('profile-id');
        // todo - need to mock fecth with jest-fetch-mock.
    });
});