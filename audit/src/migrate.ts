import * as umzugCli from 'umzug-cli';
import * as Knex from 'knex';
import Config from './config';

const connection = Knex(Config.knex);

console.log(Config.knex);

umzugCli({
    storage: 'knex-umzug',
    storageOptions: {
        context: 'default',
        connection,
        tableName: 'migrations',
    },
    migrations: {
        path: `${__dirname}/migrations`
    }
}).cli(process.argv.slice(2));
