import { writeFileSync } from 'fs';
import * as umzug from 'umzug';
import migrationTemplate from './migration-template';

export class Commands {
    private umzug: umzug.Umzug;

    public init(umzug: umzug.Umzug) {
        this.umzug = umzug;
    }

    public makeMigrationFile (filePath: string) {
        writeFileSync(filePath, migrationTemplate);
    }

    public async runMigrations() {
        const migrations = await this.umzug.up();

        migrations.forEach(({ file }) => console.log(`migrated ${file}`));
    }

    public rollback = () => {
        // rollback one migration
    }
};
