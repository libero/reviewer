# Developing

## Client side

```
cd client/
yarn install
cp .env.example .env
```

Open the `.env` file, it should look like this:

```
API_HOST=http://localhost:9000
API_PROXY_HOST=http://localhost:3000
API_PROXY_ENDPOINT=/graphql
PORT=9000
```

* The `API_URL` is used to specify the url of the server api.
* The `API_PROXY_URL` is used to configure webpack dev server's proxy settings to get around CORS restriction when running in development mode.
* The `API_PROXY_ENDPOINT` specifies which path to proxy
* The `PORT` setting is used to specify which port the client app will run on.

To start the client app, run

```
yarn run start
```

The command should open a new tab in your browser with the client app url.

## Server Side


```
cd server/
yarn install
cp .env.example .env
```

Open the `.env` file, it should look like this:

```
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=postgres
SERVER_PORT=3000
```

* The `DB_TYPE` is the type of database used.
* The `DB_HOST` and `DB_PORT` specify the url and port where the database can be accessed.
* The `DB_USERNAME`, `DB_PASSWORD` and `DB_DATABASE` define connection details.
* The `SERVER_PORT` specifies which port to bind for the server.

Next, bring up the docker services
```
docker-compose up -d
```

The settings from the `.env` file will be used to set up the services (e.g. database settings).

To start the server, run:
```
yarn run start:dev
```

