'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('candidatos', 'usuario_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('empresas', 'usuario_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('entrevistadores', 'usuario_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('candidatos', 'usuario_id');
    await queryInterface.removeColumn('empresas', 'usuario_id');
    await queryInterface.removeColumn('entrevistadores', 'usuario_id');
  }
};
