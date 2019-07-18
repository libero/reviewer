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

[TODO] update when we add config for server side.


```
cd server/
yarn install
yarn run start:dev
```

