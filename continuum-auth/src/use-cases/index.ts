import { Request, Response} from 'express';

export * from './authenticate';
export * from './login';

export const HealthCheck = (req: Request, res: Response) => {
  res.json({ok: true});
};
