export default {
  up (...args) {
      console.log(args);
    // return query.createTable('audit', {
    //     id: {
    //         type: DataTypes.UUID,
    //         allowNull: false,
    //         primaryKey: true,
    //     },
    //     subject: {
    //         type: DataTypes,
    //         allowNull: false,
    //     },
    //     verb: {
    //         type: DataTypes.UUID,
    //         allowNull: false,
    //     },
    //     entity: {
    //         type: DataTypes.UUID,
    //         allowNull: false,
    //     },
    // });

    // await this.knex.schema.createTable(this.TABLE_NAME, (table) => {
    //     table.string('id');
    //     table.string('subject');
    //     table.string('verb');
    //     table.string('entity');
    // });     
  },

  down (...args) {
    console.log(args);
  },
};
