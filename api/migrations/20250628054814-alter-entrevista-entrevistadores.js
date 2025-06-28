'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('entrevista_entrevistadores', 'data_entrevista', {
      type: Sequelize.DATE,
      allowNull: false
    });

    await queryInterface.addColumn('entrevista_entrevistadores', 'hora_entrevista', {
      type: Sequelize.TIME,
      allowNull: false
    });

    await queryInterface.addColumn('entrevista_entrevistadores', 'local_link', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('entrevista_entrevistadores', 'observacoes', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('entrevista_entrevistadores', 'data_entrevista');
    await queryInterface.removeColumn('entrevista_entrevistadores', 'hora_entrevista');
    await queryInterface.removeColumn('entrevista_entrevistadores', 'local_link');
    await queryInterface.removeColumn('entrevista_entrevistadores', 'observacoes');
  }
};