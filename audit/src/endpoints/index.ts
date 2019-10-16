import { Request, Response } from 'express';

export type Endpoint = () => (req: Request, res: Response) => void;

export const HealthCheck: Endpoint = () => (req: Request, res: Response) => {
  res.status(200).json({ ok: true });
};
