'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Mover campos da tabela entrevistas para entrevista_entrevistadores
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

    // 2. Remover campos da tabela entrevistas
    await queryInterface.removeColumn('entrevistas', 'data_entrevista');
    await queryInterface.removeColumn('entrevistas', 'hora_entrevista');
    await queryInterface.removeColumn('entrevistas', 'local_link');
  },

  async down(queryInterface, Sequelize) {
    // Reverter mudanças
    await queryInterface.addColumn('entrevistas', 'data_entrevista', {
      type: Sequelize.DATE
    });
    await queryInterface.addColumn('entrevistas', 'hora_entrevista', {
      type: Sequelize.TIME
    });
    await queryInterface.addColumn('entrevistas', 'local_link', {
      type: Sequelize.STRING
    });

    await queryInterface.removeColumn('entrevista_entrevistadores', 'data_entrevista');
    await queryInterface.removeColumn('entrevista_entrevistadores', 'hora_entrevista');
    await queryInterface.removeColumn('entrevista_entrevistadores', 'local_link');
    await queryInterface.removeColumn('entrevista_entrevistadores', 'observacoes');
  }
};
