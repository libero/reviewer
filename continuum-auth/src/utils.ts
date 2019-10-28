import { Response } from 'node-fetch';
import { InfraLogger as logger } from './logger';

// Helper function to assert on ok statuses
export function checkStatus(res: Response): Response {
    if (res.ok) {
        return res;
    } else {
        logger.debug('httpFetchErrorCode', {
            msg: res.statusText,
            error: res.status,
        });
        throw new Error(res.statusText);
    }
}
