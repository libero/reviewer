import * as express from "express";
import { Express } from "express";
import { HealthCheck, Submit } from './use-cases';

function init() {
    const app: Express = express();

    app.get("/health", HealthCheck(undefined));
    app.get('/submit', Submit);

    return app;
}

init().listen(3003, () => console.log("Service listening on port 3003"));
