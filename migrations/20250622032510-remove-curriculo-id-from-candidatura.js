'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('candidaturas', 'curriculo_id');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('candidaturas', 'curriculo_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'curriculos',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  }
};
