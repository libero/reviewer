# Developing

## Basic Configuration

Copy the example .env file

```
cp .env.example .env
```

Open the `.env` file, it should look like this (some configuration omitted)

```
# Server

## Listening port
SERVER_PORT=3000

## Database
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=postgres

...

# Client

## Listening port
CLIENT_PORT=9000

## Api proxy settings
CLIENT_API_URL=http://localhost
CLIENT_API_PROXY_URL=http://localhost
CLIENT_API_PROXY_ENDPOINT=/graphql
```

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
