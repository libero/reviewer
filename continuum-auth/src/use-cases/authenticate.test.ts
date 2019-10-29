import { Request, Response } from 'express';
import { None, Option } from 'funfix';
import * as flushPromises from 'flush-promises';
import { Authenticate } from './authenticate';
import * as jwt from "../jwt";
import config from '../config';
import { LiberoEventType } from '@libero/libero-events';

jest.mock('../logger');

describe('Authenticate Handler', () => {
    let profilesRepoMock;
    let eventBusMock;
    let requestMock;
    let responseMock;
    let decodeJournalTokenMock;
    let encodeMock;

    beforeEach(() => {
        profilesRepoMock = {
            getProfileById: jest.fn(),
        };
        eventBusMock = {
            init: jest.fn(),
            publish: jest.fn(),
            subscribe: jest.fn(),
        };
        requestMock = {
            params: {token: 'token', },
        };
        responseMock = {
            status: jest.fn(),
            json: jest.fn(),
            redirect: jest.fn(),
        };
        decodeJournalTokenMock = jest.spyOn(jwt, 'decodeJournalToken');
        encodeMock = jest.spyOn(jwt, 'encode');

        responseMock.status.mockImplementation(() => responseMock);
        profilesRepoMock.getProfileById.mockImplementation(() => Promise.resolve(Option.of({
            id: 'id',
            orcid: 'orcid',
            emailAddresses: [{value: 'foo@example.com'}],
            name: { preferred: 'bar' }
        })));
    })

    afterEach(jest.resetAllMocks);

    /**
     * Test cases where there is something wrong with the token
     */
    describe('with invalid token', () => {
        it('should return an error when no token provided', async () => {
            const handler = Authenticate(profilesRepoMock, eventBusMock);
            requestMock.params = {};

            handler(requestMock as Request, responseMock as unknown as Response);

            await flushPromises();

            expect(responseMock.status).toHaveBeenCalledTimes(1);
            expect(responseMock.status).toHaveBeenCalledWith(500);
            expect(responseMock.json).toHaveBeenCalledTimes(1);
            expect(responseMock.json).toHaveBeenCalledWith({ ok: false });
        });

        it('should throw error with invalid token', async () => {
            decodeJournalTokenMock.mockImplementation((token: string) => None);

            const handler = Authenticate(profilesRepoMock, eventBusMock);

            expect(handler(requestMock as Request, responseMock as unknown as Response)).rejects.toThrowError()

            expect(responseMock.status).toHaveBeenCalledTimes(1);
            expect(responseMock.status).toHaveBeenCalledWith(403);
            expect(responseMock.json).toHaveBeenCalledTimes(1);
            expect(responseMock.json).toHaveBeenCalledWith({ ok: false, msg: "unauthorised" });
        });
    });

    /**
     * Test cases where we have a valid token
     */
    describe('with valid token', () => {
        const encodedToken = 'encodedToken';
        const redirectUrl = 'http://login_redirect_url';

        beforeEach(() => {
            config.auth.authorised_redirect_url = redirectUrl;

            decodeJournalTokenMock.mockImplementation((token: string) => Option.of({ id: 'id' } as jwt.JournalAuthToken ));
            encodeMock.mockImplementation((payload: object) => encodedToken);
        })

        it('should return an error when no profile found', async () => {
            const handler = Authenticate(profilesRepoMock, eventBusMock);
            profilesRepoMock.getProfileById.mockImplementation(() => Promise.resolve(None));

            handler(requestMock as Request, responseMock as unknown as Response);

            await flushPromises();

            expect(responseMock.status).toHaveBeenCalledTimes(1);
            expect(responseMock.status).toHaveBeenCalledWith(403);
            expect(responseMock.json).toHaveBeenCalledTimes(1);
            expect(responseMock.json).toHaveBeenCalledWith({ ok: false, msg: "unauthorised" });
        });

        it('should redirect to correct url', async () => {
            const handler = Authenticate(profilesRepoMock, eventBusMock);

            handler(requestMock as Request, responseMock as unknown as Response);

            await flushPromises();

            expect(responseMock.redirect).toHaveBeenCalledTimes(1);
            expect(responseMock.redirect).toHaveBeenCalledWith(`${redirectUrl}#${encodedToken}`);
        });

        it('should send logged in event for audit', async () => {
            const handler = Authenticate(profilesRepoMock, eventBusMock);

            handler(requestMock as Request, responseMock as unknown as Response);

            await flushPromises();

            const auditEvent = eventBusMock.publish.mock.calls[0][0];
            expect(eventBusMock.publish).toHaveBeenCalledTimes(1);
            expect(auditEvent.eventType).toBe(LiberoEventType.userLoggedInIdentifier);
            expect(auditEvent.payload.name).toBe('bar');
            expect(auditEvent.payload.email).toBe('foo@example.com');
        });
    });


})
