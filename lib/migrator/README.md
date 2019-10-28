# Libero Migrations

This package provides an opinionated set of commands that can be used by the reviewer services for database migrations

## Migration CLI script

Its recommended to create a cli script that imports the package.

```js
import { Cli } from '@libero/migrator';
import Config from './config';

const cli = new Cli({
    banner: 'Libero Reviewer Acme Service: Migration tool',
    name: 'yarn migrate',
    knexConfig: Config.knex,
    migrations: {
        path: `${__dirname}/migrations`,
        pattern: /.*\.ts/,
    },
});

cli.exec();
```

The parameter is an object that specifies various options
* banner: Text displayed in the cli banner
* name: Displayed in the usage text
* knexConfig: Knex configuration settings for the database (see http://knexjs.org/#Installation-client)
* migrations: Configuration for the migrations (see 'migrations' object in https://github.com/sequelize/umzug#configuration)

Finally add the script to the package.json file:

```json
{
    //...
    "scripts": {
        //...
        "migrate": "src/migrate.ts"
    }
}

```

## Available commands

Run all migrations
```sh
yarn migrate run
```

Rollback one migration
```sh
yarn migrate rollback
```

Show pending and executed migrations
```sh
yarn migrate status
```

Show only pending migrations
```sh
yarn migrate status --pending
```

Show only executed migrations
```sh
yarn migrate status --executed
```