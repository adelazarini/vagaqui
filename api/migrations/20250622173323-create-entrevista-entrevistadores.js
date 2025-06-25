'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('entrevista_entrevistadores', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      entrevista_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'entrevistas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      entrevistador_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'entrevistadores',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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

    await queryInterface.addIndex('entrevista_entrevistadores',
      ['entrevista_id', 'entrevistador_id'],
      {
        unique: true,
        name: 'unique_entrevista_entrevistador'
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('entrevista_entrevistadores');
  }
};
