import * as express from 'express';
import {Express, Request, Response} from 'express';
import { InfraLogger as logger } from './logger';

import { HealthCheck, Login } from './use-cases';

function init() {
  // Start the application
  const app: Express = express();

  // Setup connections to the databases/message queues etc.

  app.use("/", (req: Request, res: Response, next) => {
    // Maybe this should be trace level logging
    logger.info(`${req.method} ${req.path}`, {} );
    next();
  });

  app.get("/health", HealthCheck);

  app.post("/login", Login);
  app.get("/login", Login);
}

init();
