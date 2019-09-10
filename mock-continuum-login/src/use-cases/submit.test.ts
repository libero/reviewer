import { Request, Response } from 'express';
import { Submit } from './submit';

describe('submit', () => {
    it('tests', () => {
        const mockRequest: Request = { } as any;
        const mockResponse: Response = { redirect: jest.fn() } as any;
        const config = {
            continuumLoginJwtSecret: 'jwt_secret',
            authenticationUrl: 'http://authurl'
        }
        const sign = jest.fn()

        sign.mockImplementation(() => 'signed_jwt_token')

        Submit(config, sign)(mockRequest, mockResponse)

        expect(sign).toHaveBeenCalledTimes(1)
        expect(mockResponse.redirect).toHaveBeenCalledTimes(1)
        expect(mockResponse.redirect).toHaveBeenCalledWith('http://authurl/authenticate/signed_jwt_token')
    })
})
