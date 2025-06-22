'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('vagas', 'data_encerramento', {
            type: Sequelize.DATE,
            defaultValue: null
        });

        await queryInterface.addColumn('vagas', 'ativo', {
            type: Sequelize.INTEGER,
            defaultValue: 1
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('vagas', 'data_encerramento');
        await queryInterface.removeColumn('vagas', 'ativo');
    }
};
