import chalk from 'chalk';
import * as boxen from 'boxen';
import * as yargs from 'yargs';
import * as umzug from 'umzug';
import * as Knex from 'knex';
import { join } from 'path';
import { Commands } from './commands';

interface MigrationCliOptions {
    banner?: string;
    name: string;
    knexConfig: Knex.Config;
    migrations: umzug.MigrationOptions;
}

type makeCommandArguments = yargs.Arguments<yargs.InferredOptionTypes<{ name: { alias: string; demandOption: true; }; }>>;
type statusCommandArguments = yargs.Arguments<yargs.InferredOptionTypes<{ pending: { alias: string }, executed: { alias: string } }>>;

export class Cli {
    constructor(readonly options: MigrationCliOptions, readonly commands: Commands = new Commands()) {
        const connection = Knex(this.options.knexConfig);
        const umzugOptions = {
            storage: 'knex-umzug',
            storageOptions: {
                context: 'default',
                connection,
                tableName: 'migrations',
            },
            migrations: { ...this.options.migrations, params: [connection] },
        // tslint:disable-next-line: no-any
        } as any;

        this.commands.init(new umzug(umzugOptions), process.stdout);
    }

    public exec() {
        this.banner();

        // tslint:disable-next-line: no-unused-expression
        yargs
            .version()
            .scriptName(this.options.name)
            .usage('Usage: $0 <command> [options]')
            .command('run', 'Migrate all pending migrations', {}, () => {
                this.commandRun();
            })
            .command(
                'make <name>',
                'Create a new migration file',
                { name: { alias: 'n', demandOption: true } },
                (argv: makeCommandArguments) => this.commandMake(argv),
            )
            .command('rollback', 'Rollback one migration', () => this.commandRollback())
            .command(
                'status',
                'Show status migrations',
                (argv: yargs.Argv) => {
                    return argv.option('pending', {
                        alias: 'p',
                        describe: 'Pending migrations',
                        type: 'boolean',
                    })
                    .option('executed', {
                        alias: 'e',
                        describe: 'Executed migrations',
                        type: 'boolean',
                    });
                },
                (argv: statusCommandArguments) => this.commandStatus(argv))
            .demandCommand()
            .help()
            .parse();
    }

    public banner() {
        const banner = chalk.white.bold(this.options.banner || '');

        const boxenOptions = {
            padding: 1,
            margin: 1,
            borderStyle: boxen.BorderStyle.Round,
            borderColor: 'green',
            backgroundColor: '#555555',
        };

        boxen(banner, boxenOptions);
    }

    public async commandRun() {
        try {
            await this.commands.runMigrations();
        } catch (e) {
            throw e;
        }

        this.finish();
    }

    public commandMake(argv: makeCommandArguments) {
        const filePath = this.filePath(argv.name as string);

        try {
            this.commands.makeMigrationFile(filePath);
        } catch (e) {
            throw e;
        }

        this.finish();
    }

    public filePath(name: string) {
        return join(`${this.options.migrations.path}`, `${Math.floor(new Date().getTime() / 1000)}-${name}.ts`);
    }

    public async commandRollback() {
        try {
            await this.commands.rollback();
        } catch (e) {
            throw e;
        }

        this.finish();
    }

    public async commandStatus(argv: statusCommandArguments) {
        await this.commands.showStatus({
            pending: !!argv.pending,
            executed: !!argv.executed,
        });

        this.finish();
    }

    public finish() {
        process.exit(0);
    }
}
