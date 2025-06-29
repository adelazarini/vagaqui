module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('entrevista_entrevistadores', 'status_entrevista', {
      type: Sequelize.ENUM('Combinar', 'Agendada', 'Aprovado', 'Reprovado', 'Cancelada'),
      allowNull: false,
      defaultValue: 'Combinar',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('entrevista_entrevistadores', 'status');
  }
};
