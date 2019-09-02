import config from './config';
import { sign } from 'jsonwebtoken';
import { InfraLogger as logger } from './logger';

const { jwt: { secret, expiresIn } } = config;

export const encode = (payload: object): string => {
  logger.trace("jwtEncode");

  const token = sign(payload, secret, { expiresIn, issuer: "continuum-auth" });

  return token;
}
