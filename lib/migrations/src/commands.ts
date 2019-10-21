import * as umzug from 'umzug';

export class Commands {
    private umzug: umzug.Umzug;

    public constructor(umzug: umzug.Umzug) {
        this.umzug = umzug;
    }

    public makeMigrationFile () {
        // create a new migration file here possibly with some
    }

    public runMigrations() {
        return this.umzug.up()
    }

    public rollback = () => {
        // rollback one migration
    }
};
