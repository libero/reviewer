export const exchangeToken = (token: string): void => {
    //Server token exchange
};

export const setToken = (token: string): void => {
    window.localStorage.setItem('token', token);
};

export const decodeToken = (token: string): string => {
    const [, payload] = token.split('.');
    return JSON.parse(atob(payload));
};

// parse JWT from the URL hash
export const getToken = (): string => {
    if (window.location && window.location.hash) {
        return window.location.hash.substring(1);
    }
    return null;
};
