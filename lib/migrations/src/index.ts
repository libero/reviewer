import chalk from 'chalk';
import * as boxen from 'boxen';
import * as yargs from 'yargs';
import * as umzug from 'umzug';
import * as Knex from 'knex';
import { Commands } from './commands';

interface MigrationCliOptions {
    banner?: string,
    name: string,
    knexConfig: Knex.Config,
    migrations: umzug.MigrationOptions,
};

export class Cli {
    private commands: Commands;

    constructor (readonly options: MigrationCliOptions) {
        const connection = Knex(this.options.knexConfig);
        const umzugOptions = {
            storage: 'knex-umzug',
            storageOptions: {
                context: 'default',
                connection,
                tableName: 'migrations',
            },
            migrations: this.options.migrations
        } as any;

        this.commands = new Commands(new umzug(umzugOptions));
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
            .command('make [name]', 'Create a new migration file', () => this.commandMake())
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
        await this.commands.runMigrations()

    }

    public commandMake() {
        this.commands.makeMigrationFile();
    }

    public commandRollback() {
        this.commands.rollback();
    }
}
