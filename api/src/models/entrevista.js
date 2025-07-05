const { Model, DataTypes } = require('sequelize');

/**
 * @swagger
 * components:
 *   schemas:
 *     Entrevista:
 *       type: object
 *       required:
 *         - candidatura_id
 *         - empresa_id
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único da entrevista
 *           example: 1
 *           readOnly: true
 *         candidatura_id:
 *           type: integer
 *           description: ID da candidatura relacionada
 *           example: 1
 *         empresa_id:
 *           type: integer
 *           description: ID da empresa responsável
 *           example: 1
 *         observacoes:
 *           type: string
 *           description: Observações gerais sobre a entrevista
 *           example: Entrevista inicial para avaliar conhecimentos técnicos
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
 *     EntrevistaCompleta:
 *       allOf:
 *         - $ref: '#/components/schemas/Entrevista'
 *         - type: object
 *           properties:
 *             candidatura:
 *               $ref: '#/components/schemas/CandidaturaComRelacionamentos'
 *             empresa:
 *               $ref: '#/components/schemas/Empresa'
 *             entrevistadores:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nome:
 *                     type: string
 *                   email:
 *                     type: string
 *                   EntrevistaEntrevistadores:
 *                     type: object
 *                     properties:
 *                       data_entrevista:
 *                         type: string
 *                         format: date
 *                       hora_entrevista:
 *                         type: string
 *                         format: time
 *                       local_link:
 *                         type: string
 *                       status_entrevista:
 *                         type: string
 *                         enum: [Combinar, Agendada, Aprovado, Reprovado, Cancelada]
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CriarEntrevistaInput:
 *       type: object
 *       required:
 *         - candidatura_id
 *       properties:
 *         candidatura_id:
 *           type: integer
 *           description: ID da candidatura
 *           example: 1
 *         observacoes:
 *           type: string
 *           description: Observações iniciais
 *           example: Primeira etapa do processo seletivo
 *         entrevistadores:
 *           type: array
 *           description: Lista de entrevistadores a serem vinculados
 *           items:
 *             type: object
 *             properties:
 *               entrevistador_id:
 *                 type: integer
 *                 example: 1
 *               data_entrevista:
 *                 type: string
 *                 format: date
 *                 example: 2025-01-15
 *               hora_entrevista:
 *                 type: string
 *                 format: time
 *                 example: "14:00:00"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     EntrevistaResumo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         candidatura:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             candidato:
 *               type: object
 *               properties:
 *                 nome:
 *                   type: string
 *             vaga:
 *               type: object
 *               properties:
 *                 titulo:
 *                   type: string
 *         proximaData:
 *           type: string
 *           format: date
 *         status:
 *           type: string
 *         totalEntrevistadores:
 *           type: integer
 */

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
            allowNull: false,
            references: {
                model: 'candidaturas',
                key: 'id'
            }
        },
        empresa_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'empresas',
                key: 'id'
            }
        },
        observacoes: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Entrevista',
        tableName: 'entrevistas',
        underscored: true
    });

    return Entrevista;
};
