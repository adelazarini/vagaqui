'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('entrevista_entrevistadores', 'empresa_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'empresas',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('entrevista_entrevistadores', 'empresa_id');
  }
};
