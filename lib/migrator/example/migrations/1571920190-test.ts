
import * as Knex from 'knex';

export default {
    up(knex: Knex) {
        return knex.schema.createTable('posts', (table: Knex.TableBuilder) => {
            table.bigIncrements('id');
            table.string('title');
            table.text('content');
        });
    },
    down(knex: Knex) {
        return knex.schema.dropTable('posts');
    },
};
