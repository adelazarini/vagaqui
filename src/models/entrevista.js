const { Model, DataTypes } = require('sequelize');

/**
 * @swagger
 * components:
 *   schemas:
 *     Entrevista:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da entrevista
 *           example: 1
 *         candidatura_id:
 *           type: integer
 *           description: ID da candidatura
 *           example: 1
 *         entrevistador_id:
 *           type: integer
 *           description: ID do entrevistador
 *           example: 1
 *         data_entrevista:
 *           type: string
 *           format: date
 *           description: Data da entrevista
 *           example: 2025-06-25
 *         hora_entrevista:
 *           type: string
 *           format: time
 *           description: Hora da entrevista
 *           example: 10:00
 *         local_link:
 *           type: string
 *           description: Local ou link da entrevista
 *           example: http://meet.google.com/xyz
 *         observacoes:
 *           type: string
 *           description: Observações sobre a entrevista
 *           example: Levar currículo impresso
 */
module.exports = (sequelize, DataTypes) => {
    // ... (seu código existente) ...
};


module.exports = (sequelize) => {
    class Entrevista extends Model {
        static associate(models) {
            // Relacionamentos
            this.belongsTo(models.Candidatura, {
                foreignKey: 'candidatura_id',
                as: 'candidatura'
            });
            // Relação N:N com Entrevistador
            this.belongsToMany(models.Entrevistador, {
                through: 'entrevista_entrevistadores',
                foreignKey: 'entrevista_id',
                otherKey: 'entrevistador_id',
                as: 'entrevistadores'
            });
        }
    }

    Entrevista.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        candidatura_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        observacoes: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Entrevista',
        tableName: 'entrevistas'
    });

    return Entrevista;
};
