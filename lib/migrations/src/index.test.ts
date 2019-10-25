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
        } as unknown as Commands;
    });

    it('command init is called in the cli constructor', () => {
        // tslint:disable-next-line: no-unused-expression
        new Cli(options, commands);
        expect(commands.init).toHaveBeenCalledTimes(1);
    });

    it('runs migrations', () => {
        // tslint:disable-next-line: no-unused-expression
        const cli = new Cli(options, commands);
        cli.finish = jest.fn();
        cli.commandRun();

        expect(commands.runMigrations).toHaveBeenCalledTimes(1);
    });

    it('rollback migrations', () => {
        // tslint:disable-next-line: no-unused-expression
        const cli = new Cli(options, commands);
        cli.finish = jest.fn();
        cli.commandRollback();

        expect(commands.rollback).toHaveBeenCalledTimes(1);
    });
});
