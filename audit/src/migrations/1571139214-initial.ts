import * as Knex from 'knex';

export default {
  up(knex: Knex) {
    return knex.schema.createTable('audit', (table: Knex.TableBuilder) => {
      table.string('id');
      table.string('subject');
      table.string('verb');
      table.string('entity');
    });
  },

  down(knex: Knex) {
    return knex.schema.dropTable('audit');
  },
};
