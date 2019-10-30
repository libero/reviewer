import { Request, Response } from 'express';
import { Login } from './login';
import { InfraLogger as logger } from '../logger';

jest.mock('../logger');
jest.mock('../config', () => ({
    default: {
        auth: {
            login_redirect_url: 'http://login_redirect_url',
        }
    }
}));

describe('login', () => {
    it('redirects', () => {
        const request = ({
            params: { token: 'token' },
        } as unknown) as Request;
        const response = ({
            redirect: jest.fn(),
        } as unknown) as Response;

        Login(request, response);
        expect(response.redirect).toHaveBeenCalledTimes(1);
        expect(response.redirect).toHaveBeenCalledWith('http://login_redirect_url');
        expect(logger.info).toHaveBeenCalledTimes(1);
        expect(logger.info).toHaveBeenCalledWith('loginRedirect', { 'login_redirect_url': 'http://login_redirect_url' });
    });
});
