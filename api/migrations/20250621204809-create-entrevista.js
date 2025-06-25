'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('entrevistas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      candidatura_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'candidaturas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      entrevistador_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'entrevistadores',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      data_entrevista: {
        type: Sequelize.DATE
      },
      hora_entrevista: {
        type: Sequelize.TIME
      },
      local_link: {
        type: Sequelize.STRING
      },
      observacoes: {
        type: Sequelize.STRING
      },
      create: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      update: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('entrevistas');
  }
};