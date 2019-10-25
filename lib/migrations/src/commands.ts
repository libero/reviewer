import { writeFileSync } from 'fs';
import { Umzug, Migration } from 'umzug';
import migrationTemplate from './migration-template';

export class Commands {
    private umzug: Umzug;
    private output: (msg: string) => void;

    public init(umzug: Umzug, output: (msg: string) => void) {
        this.umzug = umzug;
        this.output = output;
    }

    public makeMigrationFile(filePath: string) {
        writeFileSync(filePath, migrationTemplate);
    }

    public async runMigrations() {
        const migrations = await this.umzug.up();

        if (migrations.length === 0) {
            this.output('No pending migrations');
        } else {
            migrations.forEach(({ file }: Migration) => this.output(`Migrated ${file}`));
        }
    }

    public async rollback() {
        const migrations = await this.umzug.down();

        if (migrations.length === 0) {
            this.output('No migrations to roll back');
        } else {
            migrations.forEach(({ file }: Migration) => this.output(`Rolled back ${file}`));
        }
    }

    public async showStatus({ pending, executed }) {
        if (! pending && !executed) {
            pending = executed = true;
        }

        if (pending) {
            this.output('Pending migrations:');
            const pendingMigrations = await this.umzug.pending();
            pendingMigrations.forEach(({ file }: Migration) => this.output(file));
        }

        if (executed) {
            this.output('Executed migrations:');
            const executedMigrations = await this.umzug.executed();
            executedMigrations.forEach(({ file }: Migration) => this.output(file));
        }
    }
}
