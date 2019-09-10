import * as express from "express";
import { Express } from "express";
import { HealthCheck, Submit } from './use-cases';
import config from './config';

console.log(config)

function init() {
    const app: Express = express();

    app.get("/health", HealthCheck(undefined));
    app.get('/submit', Submit);

    return app;
}

init().listen(config.port, () => console.log(`Service listening on port ${config.port}`));
