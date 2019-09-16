import { getToken, getTokenFromUrl, setToken } from '../../login/utils/tokenUtils';

export const isAuthenticated = (): boolean => getToken() !== null;

export const importToken = (): void => {
    const token: string = getTokenFromUrl();

    if (token && token !== '') {
        setToken(token);
    }
};
