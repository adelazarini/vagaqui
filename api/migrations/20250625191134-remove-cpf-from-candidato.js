'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('candidatos', 'cpf');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('candidatos', 'cpf', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};
