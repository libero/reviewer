import { Cli } from './index';
import { Commands } from './commands';

describe('cli', () => {
    it('command init is called in the cli constructor', () => {
        const options = {
            name: 'name',
            knexConfig: {
                client: 'sqlite3',
                useNullAsDefault: true,
            },
            migrations: {},
        };
        const init = Commands.prototype.init = jest.fn();
        const commands = new Commands();
        // tslint:disable-next-line: no-unused-expression
        new Cli(options, commands);
        expect(init).toHaveBeenCalledTimes(1);
    });
});
