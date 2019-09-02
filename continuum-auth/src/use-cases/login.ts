// This will basically just redirect the user to the OAuth provider (ORCiD)
import { Request, Response } from 'express';
import { DomainLogger as logger } from '../logger';

import config from '../config';

const { auth: { redirect_url } } = config;

export const Login = (req: Request, res: Response) => {

  logger.info("Redirecting request", {redirect_url});

  res.redirect("http://www.google.com");
};
