import { Request, Response } from "express";
import { DomainLogger as logger } from '../logger';

export * from "./authenticate";
export * from "./login";

export const HealthCheck = (deps: unknown) => (req: Request, res: Response) => {
  logger.info("healthCheck");
  res.json({ ok: true });
};
