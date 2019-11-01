import { Response } from 'node-fetch';
import { checkStatus } from './utils';

describe('utils', () => {
    describe('check status', () => {
        it('asserts on ok status', () => {
            const response = ({
                ok: true,
            } as unknown) as Response;
            const status = checkStatus(response);
            expect(status.ok).toEqual(true);
        });
        it('throws exception when ok status not found', () => {
            const response = ({
                ok: false,
                statusText: 'not ok',
            } as unknown) as Response;
            expect(() => {
                checkStatus(response);
            }).toThrow(new Error('not ok'));
        });
    });
});