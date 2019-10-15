export default {
  async up (knex) {
    await knex.schema.createTable('audit', (table) => {
        table.string('id');
        table.string('subject');
        table.string('verb');
        table.string('entity');
    });
  },

  async down (knex) {
    knex.schema.dropTable('audit');
  },
};
