# Configuration

The dotenv library is used to load the .env file

## RabbitMQ
* `RABBITMQ_URL`: the rabbit message queue URL

## Postgres
* `POSTGRES_PORT`: Postgres listening port

## Server configuration

Copy the example config files for the server
```sh
cp config/server/config.example.json config/server/config.json
cp config/server/newrelic.example.js config/server/newrelic.js
```

and amend the files as needed. For more details see the [Reviewer Submission documentation](https://github.com/libero/reviewer-submission/blob/master/docs/configuration.md)

### New Relic

For more info, see the [New Relic](https://docs.newrelic.com/docs/agents/nodejs-agent/installation-configuration/nodejs-agent-configuration) documentation

* `NEW_RELIC_ENABLED`: By default new relic is disabled. Set this to true to turn on the New Relic agent on the server.
* `NEW_RELIC_LICENSE_KEY`: Server agent license key
* `NEW_RELIC_APP_NAME`: Server agent app name
* `NEW_RELIC_NO_CONFIG_FILE`: Whether to disable config file (should be always true)
* `NEW_RELIC_LOG_LEVEL`: Info level


## Client configuration

### Listening Port
* `CLIENT_PORT`: port number where client will listen to

### Api proxy settings
* `CLIENT_API_URL`: the url of the api
* `CLIENT_API_PROXY_URL`: the url to proxy api requests to 
* `CLIENT_AUTH_PROXY_URL`: the url to proxy authentication requests to

### New Relic
* `NEW_RELIC_CLIENT_LICENSE_KEY`: License key for browser agent.
* `NEW_RELIC_CLIENT_APP_ID`: App ID for browser agent.


## Authentication configuration

* `AUTHENTICATION_PORT`: port number where configuration service will listen to
* `AUTHENTICATION_URL`: Internal url of authentication service run token exchange
* `AUTHENTICATION_JWT_SECRET`: secret used to sign jwt tokens


## Continuum login configuration

* `CONTINUUM_LOGIN_PORT`: port number where configuration service will listen to
* `CONTINUUM_LOGIN_URL`: public url where users are redirected to for authentication
* `CONTINUUM_LOGIN_JWT_SECRET`: secret used to sign jwt tokens
