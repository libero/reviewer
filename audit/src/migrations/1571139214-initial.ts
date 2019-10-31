import * as Knex from 'knex';

export default {
  up(knex: Knex) {
    return knex.schema.createTable('audit', (table: Knex.TableBuilder) => {
      table.string('entity');
      table.string('action');
      table.string('object');
      table.timestamp('created').defaultTo(knex.fn.now());
    });
  },

  down(knex: Knex) {
    return knex.schema.dropTable('audit');
  },
};
