import { Request, Response } from 'express';
import { Login } from './login';
import config from '../config';

describe('login', () => {
    it.only('redirects', () => {
        const request = ({
            params: { token: 'token' },
        } as unknown) as Request;
        const response = ({
            redirect: jest.fn(),
        } as unknown) as Response;

        config.auth.login_redirect_url = 'http://login_redirect_url';

        Login(request, response);
        expect(response.redirect).toHaveBeenCalledTimes(1);
        expect(response.redirect).toHaveBeenCalledWith('http://login_redirect_url');
    });
});
