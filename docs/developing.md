# Developing

## Configuration

Copy the example .env file

```
cp .env.example .env
```

Open the `.env` file, it should look like this:

```
# Server
SERVER_PORT=3000
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=postgres

# Client
CLIENT_PORT=9000
CLIENT_API_URL=http://localhost
CLIENT_API_PROXY_URL=http://localhost
CLIENT_API_PROXY_ENDPOINT=/graphql
```

### Server configuration

* `SERVER_PORT`: sets the port number that the server listens to.
* `DB_TYPE`: is the type of database used.
* `DB_HOST`: hostname where the database can be reached
* `DB_PORT`: port number to access database
* `DB_USERNAME`: database username
* `DB_PASSWORD`: database password
* `DB_DATABASE` define connection details.

### Client

* `CLIENT_PORT`: port number where client will listen to
* `CLIENT_API_URL`: the url of the api
* `CLIENT_API_PROXY_URL`: the url to proxy api requests to (development only)
* `CLIENT_API_PROXY_ENDPOINT`: endpoint target for api proxying (development only)

## Running locally

### Client
To run the client:

```
cd client/
yarn install
yarn run start
```

The command should open a new tab in your browser with the client app url.

### Server

Start the database service
```
docker-compose up -d postgres
```

To start the server, run
```
cd server/
yarn
yarn run start:dev
```

## Running in containers

Bring up all the containers using docker compose:

```
docker-compose up -d
```

To shutdown, run
```
docker-compose down
```
