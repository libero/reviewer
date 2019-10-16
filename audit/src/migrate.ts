import * as umzugCli from 'umzug-cli';
import * as Knex from 'knex';
import Config from './config';

const connection = Knex(Config.knex);

umzugCli({
    storage: 'knex-umzug',
    storageOptions: {
        context: 'default',
        connection,
        tableName: 'migrations',
    },
    migrations: {
        params: [connection],
        path: `${__dirname}/migrations`,
        pattern: /.*\.ts/,
    },
}).cli(process.argv.slice(2)).then(() => process.exit());
