# Developing

## Setup

Setup the configuration by running

```sh
make setup
```

This should get you started with a [default env configuration](../.env.example), [config json file](../config/server/config.example.json) and [newrelic config file](../config/server/newrelic.example.js) that works out of the box. Refer to the
[Configuration documentation](./configuration.md) for a more detailed description.


## Run reviewer

To start the containers:

```sh
make start
```

Stop the containers

```sh
make stop
```

Show the logs:

```sh
make follow_logs
```
