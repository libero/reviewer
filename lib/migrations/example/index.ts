import { Cli } from '../src/index';
import { Commands } from '../src/commands';

console.log(`${__dirname}/migrations`);

const cli = new Cli({
    banner: 'Example database migration tools',
    name: 'migrate',
    knexConfig: {
        client: 'sqlite3',
        connection: {
            filename: `${__dirname}/db.sqlite`,
        },
        useNullAsDefault: true,
    },
    migrations:{
        path: `${__dirname}/migrations`,
        pattern: /.*\.ts/,
    }
}, new Commands());

cli.exec();
