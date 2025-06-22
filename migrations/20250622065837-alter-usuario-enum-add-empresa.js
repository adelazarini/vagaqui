'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      "ALTER TYPE enum_usuarios_tipo_usuario ADD VALUE 'Empresa';"
    );
  },

  async down(queryInterface, Sequelize) {

    console.log('Não é possível reverter facilmente a adição de valores em ENUM');
  }
};
