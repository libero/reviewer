import { Cli } from './index';
import { Commands } from './commands';

describe('cli', () => {
    let options;
    let commands;

    beforeEach(() => {
        options = {
            name: 'name',
            knexConfig: {
                client: 'sqlite3',
                useNullAsDefault: true,
            },
            migrations: {},
        };

        commands = {
            init: jest.fn(),
            runMigrations: jest.fn(),
            rollback: jest.fn(),
            makeMigrationFile: jest.fn(),
            showStatus: jest.fn(),
        } as unknown as Commands;
    });

    it('command init is called in the cli constructor', () => {
        // tslint:disable-next-line: no-unused-expression
        new Cli(options, commands);
        expect(commands.init).toHaveBeenCalledTimes(1);
    });

    it('runs migrations', () => {
        const cli = new Cli(options, commands);
        cli.finish = jest.fn();
        cli.commandRun();

        expect(commands.runMigrations).toHaveBeenCalledTimes(1);
    });

    it('rollbacks migrations', () => {
        const cli = new Cli(options, commands);
        cli.finish = jest.fn();
        cli.commandRollback();

        expect(commands.rollback).toHaveBeenCalledTimes(1);
    });

    it('makes migration fixture', () => {
        const cli = new Cli(options, commands);
        cli.finish = jest.fn();
        cli.filePath = () => '/path/to/-test.ts';
        cli.commandMake({ _: ['make'], $0: 'migrate', name: 'test', n: 'test' });

        expect(commands.makeMigrationFile).toHaveBeenCalledTimes(1);
        expect(commands.makeMigrationFile).toHaveBeenCalledWith('/path/to/-test.ts');
    });

    it('displays status of migrations', () => {
        const cli = new Cli(options, commands);
        cli.finish = jest.fn();
        cli.commandStatus({ _: [ 'status' ], $0: 'example-cli', pending: true, executed: false });

        expect(commands.showStatus).toHaveBeenCalledTimes(1);
        expect(commands.showStatus).toHaveBeenCalledWith({ pending: true, executed: false });
    });
});
