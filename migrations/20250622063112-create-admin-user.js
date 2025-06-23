'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    await queryInterface.bulkInsert('usuarios', [{
      nome: 'Administrador do Sistema',
      email: 'admin@vagaqui.com',
      senha: hashedPassword,
      tipo_usuario: 'Administrador',
      token: null,
      ultimo_login: null
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', {
      email: 'admin@vagaqui.com'
    }, {});
  }
}; 
