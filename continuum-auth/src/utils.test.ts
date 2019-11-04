import { Response } from 'node-fetch';
import { checkStatus } from './utils';

describe('utils', () => {
    describe('check status', () => {
        it('asserts on ok status', () => {
            const status = checkStatus(new Response('', { status: 200 }));
            expect(status).toBeInstanceOf(Response);
        });

        it('throws exception when ok status not found', () => {
            expect(() => {
                checkStatus(new Response('', { status: 400 }));
            }).toThrow(new Error('Bad Request'));
        });
    });
});
