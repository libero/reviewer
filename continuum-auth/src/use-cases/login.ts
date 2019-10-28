// This will basically just redirect the user to the OAuth provider (ORCiD)
import { Request, Response } from 'express';
import { DomainLogger as logger } from '../logger';

import config from '../config';

const {
    auth: { loginRedirectUrl },
} = config;

export const Login = (req: Request, res: Response): void => {
    logger.info('loginRedirect', { loginRedirectUrl });

    res.redirect(loginRedirectUrl);
};
