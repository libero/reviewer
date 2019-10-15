export default {
  up (knex) {
    return knex.schema.createTable('audit', table => {
      table.string('id');
      table.string('subject');
      table.string('verb');
      table.string('entity');
    });
  },

  down (knex) {
    return knex.schema.dropTable('audit');
  },
};
