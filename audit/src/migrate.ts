import { Cli, Commands } from '@libero/migrations';
import Config from './config';

const cli = new Cli({
    banner: 'Libero Reviewer Audit Service: Migration tool',
    name: 'migrate',
    knexConfig: Config.knex,
    migrations: {
        path: `${__dirname}/migrations`,
        pattern: /.*\.ts/,
    },
}, new Commands());

cli.exec();
