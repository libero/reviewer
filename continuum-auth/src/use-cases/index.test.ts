import { Request, Response } from 'express';
import { HealthCheck } from './index';

describe('healthcheck', () => {
    it.only('is OK', () => {
        const request = ({
            params: { token: 'token' },
        } as unknown) as Request;
        const response = ({
            status: jest.fn(),
            json: jest.fn(),
            redirect: jest.fn(),
        } as unknown) as Response;
        HealthCheck()(request, response);
        expect(response.json).toHaveBeenCalledTimes(1);
        expect(response.json).toHaveBeenCalledWith({ ok: true });
    });
});
