'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.removeColumn('entrevistas', 'entrevistador_id');
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.addColumn('entrevistas', 'entrevistador_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'entrevistadores',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  }
};
