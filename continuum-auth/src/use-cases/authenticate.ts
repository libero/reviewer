import {Request, Response} from 'express';
import { DomainLogger as logger } from '../logger';
import { Option } from 'funfix';
import { encode } from '../jwt';

interface AuthenticateParams  {
  token: string;
}
// This is the endpoint that does the actual token exchange/user lookup and signing the output token
// And yeah, I know the controller/usecase code shouldn't be mixed but idec, we can refactor it at some point
export const Authenticate = (req: Request, res: Response) => {
  Option.of(req.params['token']).map((token: string): void => {

    const some_token = {cool: "beans"};

    res.status(200).json({ok: true, token: encode(some_token)});
  }).getOrElseL(() => {
    logger.warn("noTokenProvided");
    res.status(500).json({ok: false});
  });
};
