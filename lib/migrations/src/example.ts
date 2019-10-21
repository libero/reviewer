import { Cli } from './index';

const cli = new Cli({
    banner: 'Example database migration tools',
    name: 'migrate',
    knexConfig: {
        client: 'sqlite3',
        connection: {
            filename: './example.sqlite',
        },
        useNullAsDefault: true,
    },
    migrations:{
        path: `${__dirname}/migrations`,
    }
});

cli.exec();
