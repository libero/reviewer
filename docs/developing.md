# Developing

## Basic Configuration

Copy the example .env file

```
cp .env.example .env
```

This should get you started with a [default configuration](../.env.example) that works out of the box. Refer to the
[Configuration documentation](./configuration.md) for a more detailed description.

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
