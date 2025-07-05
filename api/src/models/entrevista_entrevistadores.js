const { Model, DataTypes } = require('sequelize');

/**
 * @swagger
 * components:
 *   schemas:
 *     EntrevistaEntrevistadores:
 *       type: object
 *       required:
 *         - entrevista_id
 *         - entrevistador_id
 *         - empresa_id
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do vínculo entrevista-entrevistador
 *           example: 1
 *           readOnly: true
 *         entrevista_id:
 *           type: integer
 *           description: ID da entrevista
 *           example: 1
 *         entrevistador_id:
 *           type: integer
 *           description: ID do entrevistador
 *           example: 1
 *         data_entrevista:
 *           type: string
 *           format: date
 *           description: Data da entrevista
 *           example: 2025-01-10
 *         hora_entrevista:
 *           type: string
 *           format: time
 *           description: Horário da entrevista
 *           example: "14:00:00"
 *         local_link:
 *           type: string
 *           description: Local físico ou link da reunião online
 *           example: https://meet.google.com/abc-defg-hij
 *         observacoes:
 *           type: string
 *           description: Observações sobre a entrevista
 *           example: Entrevista técnica focada em React e Node.js
 *         status_entrevista:
 *           type: string
 *           description: Status atual da entrevista
 *           enum: [Combinar, Agendada, Aprovado, Reprovado, Cancelada]
 *           default: Combinar
 *           example: Agendada
 *         empresa_id:
 *           type: integer
 *           description: ID da empresa responsável
 *           example: 1
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
 *     EntrevistaEntrevistadoresCompleto:
 *       allOf:
 *         - $ref: '#/components/schemas/EntrevistaEntrevistadores'
 *         - type: object
 *           properties:
 *             entrevista:
 *               $ref: '#/components/schemas/Entrevista'
 *             entrevistador:
 *               $ref: '#/components/schemas/Entrevistador'
 *             empresa:
 *               $ref: '#/components/schemas/Empresa'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     VincularEntrevistadorInput:
 *       type: object
 *       required:
 *         - entrevistador_id
 *       properties:
 *         entrevistador_id:
 *           type: integer
 *           description: ID do entrevistador a ser vinculado
 *           example: 1
 *         data_entrevista:
 *           type: string
 *           format: date
 *           description: Data proposta para entrevista
 *           example: 2025-01-10
 *         hora_entrevista:
 *           type: string
 *           format: time
 *           description: Horário proposto
 *           example: "14:00:00"
 *         local_link:
 *           type: string
 *           description: Local ou link da entrevista
 *           example: https://meet.google.com/abc-defg-hij
 *         observacoes:
 *           type: string
 *           description: Observações iniciais
 *           example: Entrevista técnica
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AtualizarAgendamentoInput:
 *       type: object
 *       properties:
 *         data_entrevista:
 *           type: string
 *           format: date
 *           example: 2025-01-15
 *         hora_entrevista:
 *           type: string
 *           format: time
 *           example: "16:00:00"
 *         local_link:
 *           type: string
 *           example: Sala de reunião 3 - 5º andar
 *         status_entrevista:
 *           type: string
 *           enum: [Combinar, Agendada, Aprovado, Reprovado, Cancelada]
 *           example: Agendada
 *         observacoes:
 *           type: string
 *           example: Reagendado a pedido do candidato
 */

module.exports = (sequelize) => {
    class EntrevistaEntrevistadores extends Model {
        static associate(models) {
            this.belongsTo(models.Entrevista, {
                foreignKey: 'entrevista_id',
                as: 'entrevista'
            });
            this.belongsTo(models.Entrevistador, {
                foreignKey: 'entrevistador_id',
                as: 'entrevistador'
            });
        }
    }

    EntrevistaEntrevistadores.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        entrevista_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'entrevistas', key: 'id' }
        },
        entrevistador_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'entrevistadores', key: 'id' }
        },
        data_entrevista: {
            type: DataTypes.DATE,
            allowNull: true
        },
        hora_entrevista: {
            type: DataTypes.TIME,
            allowNull: true
        },
        local_link: {
            type: DataTypes.STRING,
            allowNull: true
        },
        observacoes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status_entrevista: {
            type: DataTypes.ENUM('Combinar', 'Agendada', 'Aprovado', 'Reprovado', 'Cancelada'),
            allowNull: false,
            defaultValue: 'Combinar'
        },
        empresa_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'empresas', key: 'id' }
        },
    }, {
        sequelize,
        modelName: 'EntrevistaEntrevistadores',
        tableName: 'entrevista_entrevistadores',
        underscored: true,
        timestamps: true
    });

    return EntrevistaEntrevistadores;
};
