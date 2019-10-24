import { writeFileSync } from 'fs';
import * as umzug from 'umzug';
import migrationTemplate from './migration-template';

export class Commands {
    private umzug: umzug.Umzug;

    public init(eventEmitter: umzug.Umzug) {
        this.umzug = eventEmitter;
    }

    public makeMigrationFile(filePath: string) {
        writeFileSync(filePath, migrationTemplate);
    }

    public async runMigrations() {
        await this.umzug.up();
    }

    public rollback = () => {
        // rollback one migration
    }
}
