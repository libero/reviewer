import * as express from 'express';
import {Express, Request, Response} from 'express';
import { InfraLogger as logger } from './logger';

import { HealthCheck, Login, Authenticate } from './use-cases';

function init() {
  logger.info("Starting service");
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

  app.get("/authenticate/:token", Authenticate);
  
  return app;
}

init().listen(3001, () => logger.info("Service listening on port 3001"));
