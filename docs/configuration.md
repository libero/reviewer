# Configuration

The dotenv library is used to load the .env file

## RabbitMQ
* `RABBITMQ_URL`: the rabbit message queue URL

## Server configuration

### Listening Port
* `SERVER_PORT`: sets the port number that the server listens to.

### Database
* `SERVER_DB_HOST`: hostname where the database can be reached.
* `SERVER_DB_PORT`: port number to access database.
* `SERVER_DB_USERNAME`: database username.
* `SERVER_DB_PASSWORD`: database password.
* `SERVER_DB_NAME` define database name.

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
* `CLIENT_API_PROXY_URL`: the url to proxy api requests to (development only)
* `CLIENT_API_PROXY_ENDPOINT`: endpoint target for api proxying (development only)

### New Relic
* `NEW_RELIC_CLIENT_LICENSE_KEY`: License key for browser agent.
* `NEW_RELIC_CLIENT_APP_ID`: App ID for browser agent.

## Authentication Service configuration

These settings are used to configure the `continuum-auth` service

### Listening Port and Url
* `AUTHENTICATION_PORT`: port number where configuration service will listen to
* `AUTHENTICATION_URL`: public url for the authentication

### JWT Secret
* `AUTHENTICATION_JWT_SECRET`: secret used to sign jwt tokens

## Continuum login serve

These settings are used to configure the `mock-continuum-login` service

### Listening Port and Url
* `CONTINUUM_LOGIN_PORT`: port number where configuration service will listen to
* `CONTINUUM_LOGIN_URL`: public url for the authentication

### JWT Secret
* `CONTINUUM_LOGIN_JWT_SECRET`: secret used to sign jwt tokens


## Audit Service configuration

### Listening port
* `AUDIT_PORT`: port number for audit service

### Database
* `AUDIT_DB_HOST`: hostname where the database can be reached.
* `AUDIT_DB_PORT`: port number to access database.
* `AUDIT_DB_USERNAME`: database username.
* `AUDIT_DB_PASSWORD`: database password.
* `SERVER_DB_NAME` define database name.