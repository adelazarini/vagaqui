'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE candidaturas
      DROP CONSTRAINT candidaturas_vaga_id_fkey,
      ADD CONSTRAINT candidaturas_vaga_id_fkey
      FOREIGN KEY (vaga_id)
      REFERENCES vagas(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE;
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE candidaturas
      DROP CONSTRAINT candidaturas_candidato_id_fkey,
      ADD CONSTRAINT candidaturas_candidato_id_fkey
      FOREIGN KEY (candidato_id)
      REFERENCES candidatos(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE;
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE candidaturas
      DROP CONSTRAINT candidaturas_vaga_id_fkey,
      ADD CONSTRAINT candidaturas_vaga_id_fkey
      FOREIGN KEY (vaga_id)
      REFERENCES vagas(id)
      ON DELETE SET NULL
      ON UPDATE CASCADE;
    `);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE candidaturas
      DROP CONSTRAINT candidaturas_candidato_id_fkey,
      ADD CONSTRAINT candidaturas_candidato_id_fkey
      FOREIGN KEY (candidato_id)
      REFERENCES candidatos(id)
      ON DELETE SET NULL
      ON UPDATE CASCADE;
    `);
  }


};
