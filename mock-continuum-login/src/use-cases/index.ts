import { Request, Response } from "express";

export * from "./submit";

export const HealthCheck = (deps: unknown) => (req: Request, res: Response) => {
  res.json({ ok: true });
};
