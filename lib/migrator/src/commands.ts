import * as table from 'borderless-table';
import { writeFileSync } from 'fs';
import { EOL } from 'os';
import { Migration, Umzug } from 'umzug';
import migrationTemplate from './migration-template';

export class Commands {
    private umzug: Umzug;
    private stdout: NodeJS.WriteStream;

    public init(umzug: Umzug, stdout: NodeJS.WriteStream) {
        this.umzug = umzug;
        this.stdout = stdout;
    }

    public makeMigrationFile(filePath: string) {
        writeFileSync(filePath, migrationTemplate);

        this.printLn(`Successfuly created migration ${filePath}`);
    }

    public async runMigrations() {
        const migrations = await this.umzug.up();

        this.printMigrations(migrations, 'Successfuly migrated:');
    }

    public async rollback() {
        const migrations = await this.umzug.down();

        this.printMigrations(migrations, 'Successfuly rolled back:');
    }

    public async showStatus({ pending, executed }) {
        if (! pending && !executed) {
            pending = executed = true;
        }

        if (pending) {
            const pendingMigrations = await this.umzug.pending();
            this.printMigrations(pendingMigrations, 'Pending migrations');
        }

        if (executed) {
            const executedMigrations = await this.umzug.executed();
            this.printMigrations(executedMigrations, 'Executed migrations');
        }
    }

    private printLn(msg: string = '') {
        this.stdout.write(msg + EOL);
    }

    private printMigrations(migrations: Migration[], header: string) {
        table(migrations, ['file'], [header], this.stdout);
        this.printLn();
    }
}
