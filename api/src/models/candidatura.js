const { Model, DataTypes } = require('sequelize');

/**
 * @swagger
 * components:
 *   schemas:
 *     Candidatura:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da candidatura
 *           example: 1
 *         vaga_id:
 *           type: integer
 *           description: ID da vaga
 *           example: 1
 *         candidato_id:
 *           type: integer
 *           description: ID do candidato
 *           example: 1
 *         status:
 *           type: string
 *           description: Status da candidatura
 *           example: Em análise
 *         data_candidatura:
 *           type: string
 *           format: date
 *           description: Data da candidatura
 *           example: 2025-06-23
 */
module.exports = (sequelize, DataTypes) => {
    // ... (seu código existente) ...
};


module.exports = (sequelize) => {
    class Candidatura extends Model {
        static associate(models) {
            // Relacionamentos
            this.belongsTo(models.Candidato, {
                foreignKey: 'candidato_id',
                as: 'candidato'
            });
            this.belongsTo(models.Vaga, {
                foreignKey: 'vaga_id',
                as: 'vaga'
            });

            this.hasOne(models.Entrevista, {
                foreignKey: 'candidatura_id',
                as: 'entrevista'
            });
        }
    }

    Candidatura.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        vaga_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        candidato_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        status: DataTypes.STRING,
        data_candidatura: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: 'Candidatura',
        tableName: 'candidaturas'
    });

    return Candidatura;
};
