import chalk from 'chalk';
import * as boxen from 'boxen';
import * as yargs from 'yargs';
import * as umzug from 'umzug';
import * as Knex from 'knex';
import { join } from 'path';
import { Commands } from './commands';

interface MigrationCliOptions {
    banner?: string,
    name: string,
    knexConfig: Knex.Config,
    migrations: umzug.MigrationOptions,
};

export class Cli {
    constructor (readonly options: MigrationCliOptions, readonly commands: Commands) {
        const connection = Knex(this.options.knexConfig);
        const umzugOptions = {
            storage: 'knex-umzug',
            storageOptions: {
                context: 'default',
                connection,
                tableName: 'migrations',
            },
            migrations: { ...this.options.migrations, params: [connection] }
        } as any;

        this.commands.init(new umzug(umzugOptions));
    }

    public exec() {
        this.banner();

        yargs
            .version()
            .scriptName(this.options.name)
            .usage('Usage: $0 <command> [options]')
            .command('run', 'Migrate all pending migrations', {}, () => {
                this.commandRun();
            })
            .command(
                'make [name]',
                'Create a new migration file',
                { name: { alias: 'n', demandOption: true } },
                (argv: yargs.Arguments<yargs.InferredOptionTypes<{ name: { alias: string; demandOption: true; }; }>>) => this.commandMake(argv)
            )
            .command('rollback', 'Rollback one migration', () => this.commandRollback())
            .demandCommand()
            .help()
            .argv;
    }

    public banner() {
        const banner = chalk.white.bold(this.options.banner || '');

        const boxenOptions = {
            padding: 1,
            margin: 1,
            borderStyle: boxen.BorderStyle.Round,
            borderColor: "green",
            backgroundColor: "#555555"
        };

        const bannerBox = boxen(banner, boxenOptions);

        console.log(bannerBox);
    }

    public async commandRun() {
        try {
            await this.commands.runMigrations();
            console.log('migrations done');
        } catch (e) {
            console.log(chalk.red(`Error running migrations`));
            throw e;
        }

        console.log('exiting');
        process.exit(0);
    }

    public commandMake(argv: yargs.Arguments<yargs.InferredOptionTypes<{ name: { alias: string; demandOption: true; }; }>>) {
        const filePath = join(`${this.options.migrations.path}`, `${Math.floor(new Date().getTime() / 1000)}-${argv.name}.ts`);

        try {
            this.commands.makeMigrationFile(filePath);
        } catch (e) {
            console.log(chalk.red(`Error creating migration file ${filePath}`));
            throw e;
        }

        console.log(chalk.green(`Migration file ${filePath} created`));

        process.exit(0);
    }

    public commandRollback() {
        this.commands.rollback();

        process.exit(0);
    }
}
