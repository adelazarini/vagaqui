const { Model, DataTypes } = require('sequelize');

/**
 * @swagger
 * components:
 *   schemas:
 *     Candidatura:
 *       type: object
 *       required:
 *         - vaga_id
 *         - candidato_id
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único da candidatura
 *           example: 1
 *           readOnly: true
 *         vaga_id:
 *           type: integer
 *           description: ID da vaga relacionada
 *           example: 1
 *         candidato_id:
 *           type: integer
 *           description: ID do candidato
 *           example: 1
 *         curriculo_id:
 *           type: integer
 *           description: ID do currículo anexado
 *           example: 1
 *         status:
 *           type: string
 *           description: Status atual da candidatura
 *           enum: [pendente, em_analise, aprovado, reprovado]
 *           default: pendente
 *           example: em_analise
 *         data_candidatura:
 *           type: string
 *           format: date-time
 *           description: Data e hora da candidatura
 *           example: 2025-01-05T10:00:00.000Z
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação do registro
 *           readOnly: true
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização
 *           readOnly: true
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CandidaturaComRelacionamentos:
 *       allOf:
 *         - $ref: '#/components/schemas/Candidatura'
 *         - type: object
 *           properties:
 *             candidato:
 *               $ref: '#/components/schemas/Candidato'
 *             vaga:
 *               $ref: '#/components/schemas/Vaga'
 *             entrevistas:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Entrevista'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CandidaturaInput:
 *       type: object
 *       required:
 *         - vaga_id
 *       properties:
 *         vaga_id:
 *           type: integer
 *           description: ID da vaga
 *           example: 1
 *         curriculo_id:
 *           type: integer
 *           description: ID do currículo (opcional)
 *           example: 1
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CandidaturaStatusUpdate:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           enum: [pendente, em_analise, aprovado, reprovado]
 *           description: Novo status da candidatura
 *           example: aprovado
 *         observacoes:
 *           type: string
 *           description: Observações sobre a mudança de status
 *           example: Candidato aprovado para próxima fase
 */

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
