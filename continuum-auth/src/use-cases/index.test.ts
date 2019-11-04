import { Request, Response } from 'express';
import { HealthCheck } from './index';

jest.mock('../logger');

describe('healthcheck', () => {
    it('is OK', () => {
        const request = ({
            params: { token: 'token' },
        } as unknown) as Request;
        const response = ({
            json: jest.fn(),
        } as unknown) as Response;
        HealthCheck()(request, response);
        expect(response.json).toHaveBeenCalledTimes(1);
        expect(response.json).toHaveBeenCalledWith({ ok: true });
    });
});
