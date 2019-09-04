import * as express from "express";
import { Request, Response } from "express";

const main = () => {
  const app = express();

  app.get("/health", (req: Request, res: Response) => res.json({ ok: true }));

  return app;
};

main().listen(3002, () => console.log("pop"));
