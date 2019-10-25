import { writeFileSync } from 'fs';
import { Umzug } from 'umzug';
import migrationTemplate from './migration-template';

// tslint:disable-next-line: no-console
const log = console.log;

export class Commands {
    private umzug: Umzug;

    public init(umzug: Umzug) {
        this.umzug = umzug;
    }

    public makeMigrationFile(filePath: string) {
        writeFileSync(filePath, migrationTemplate);
    }

    public async runMigrations() {
        const migrations = await this.umzug.up();

        if (migrations.length === 0) {
            log('No pending migrations');
        } else {
            migrations.forEach(({ file }) => log(`Migrated ${file}`));
        }
    }

    public async rollback() {
        const migrations = await this.umzug.down();

        if (migrations.length === 0) {
            log('No migrations to roll back');
        } else {
            migrations.forEach(({ file }) => log(`Rolled back ${file}`));
        }
    }

    public async showStatus({ pending, executed }) {
        if (! pending && !executed) {
            pending = executed = true;
        }

        if (pending) {
            log('Pending migrations:');
            const pendingMigrations = await this.umzug.pending();
            pendingMigrations.forEach(({ file }) => log(file));
        }

        if (executed) {
            log('Executed migrations:');
            const executedMigrations = await this.umzug.executed();
            executedMigrations.forEach(({ file }) => log(file));
        }
    }

}
