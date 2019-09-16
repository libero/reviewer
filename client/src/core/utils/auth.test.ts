import * as Auth from '../../core/utils/auth';
import * as tokenUtils from '../../login/utils/tokenUtils';

describe('auth', (): void => {
    afterEach((): void => {
        jest.resetAllMocks();
    });

    describe('isAuthenticated', (): void => {
        it('returns false if token not set', (): void => {
            jest.spyOn(tokenUtils, 'getToken').mockImplementation((): string => null);

            expect(Auth.isAuthenticated()).toBeFalsy();
        });

        it('returns true if token set', (): void => {
            jest.spyOn(tokenUtils, 'getToken').mockImplementation((): string => 'token');

            expect(Auth.isAuthenticated()).toBe(true);
        });
    });

    describe('importToken', (): void => {
        it('sets token if token present in url', (): void => {
            jest.spyOn(tokenUtils, 'getTokenFromUrl').mockImplementation((): string => 'token_from_url');
            jest.spyOn(tokenUtils, 'setToken').mockImplementation(jest.fn());

            Auth.importToken();

            expect(tokenUtils.getTokenFromUrl).toHaveBeenCalledTimes(1);
            expect(tokenUtils.setToken).toHaveBeenCalledTimes(1);
            expect(tokenUtils.setToken).toHaveBeenCalledWith('token_from_url');
        });

        it("doesn't set token if token not present in url", (): void => {
            jest.spyOn(tokenUtils, 'getTokenFromUrl').mockImplementation((): string => '');
            jest.spyOn(tokenUtils, 'setToken').mockImplementation(jest.fn());

            Auth.importToken();

            expect(tokenUtils.getTokenFromUrl).toHaveBeenCalledTimes(1);
            expect(tokenUtils.setToken).not.toHaveBeenCalled();
        });
    });
});
