// This will basically just redirect the user to the OAuth provider (ORCiD)
import { Request, Response } from 'express';
import { DomainLogger as logger } from '../logger';

import config from '../config';

const {
    auth: { login_redirect_url },
} = config;

export const Login = (req: Request, res: Response): void => {
    logger.info('loginRedirect', { login_redirect_url });

    res.redirect(login_redirect_url);
};
