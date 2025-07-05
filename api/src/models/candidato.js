const { Model, DataTypes } = require('sequelize');
/**
 * @swagger
 * components:
 *   schemas:
 *     Candidato:
 *       type: object
 *       required:
 *         - nome
 *         - usuario_id
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do candidato
 *           example: 1
 *           readOnly: true
 *         nome:
 *           type: string
 *           description: Nome completo do candidato
 *           example: João Silva
 *         telefone:
 *           type: string
 *           description: Telefone do candidato com DDD
 *           example: "(11) 99999-9999"
 *         formacao:
 *           type: string
 *           description: Formação acadêmica do candidato
 *           example: Bacharelado em Engenharia de Software
 *         experiencia:
 *           type: string
 *           description: Experiência profissional detalhada
 *           example: 5 anos de experiência como desenvolvedor full stack, com foco em React e Node.js
 *         usuario_id:
 *           type: integer
 *           description: ID do usuário associado (foreign key)
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
 *       example:
 *         id: 1
 *         nome: João Silva
 *         telefone: "(11) 99999-9999"
 *         formacao: Bacharelado em Engenharia de Software
 *         experiencia: 5 anos de experiência como desenvolvedor full stack
 *         usuario_id: 1
 *         createdAt: "2025-01-05T10:00:00.000Z"
 *         updatedAt: "2025-01-05T10:00:00.000Z"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CandidatoComRelacionamentos:
 *       allOf:
 *         - $ref: '#/components/schemas/Candidato'
 *         - type: object
 *           properties:
 *             usuario:
 *               $ref: '#/components/schemas/Usuario'
 *             curriculo:
 *               $ref: '#/components/schemas/Curriculo'
 *             candidaturas:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Candidatura'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CandidatoInput:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - senha
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome completo do candidato
 *           example: João Silva
 *         email:
 *           type: string
 *           format: email
 *           description: Email do candidato
 *           example: joao.silva@email.com
 *         senha:
 *           type: string
 *           format: password
 *           description: Senha do candidato (mínimo 6 caracteres)
 *           example: senha123
 *         cpf:
 *           type: string
 *           description: CPF do candidato
 *           example: "123.456.789-00"
 *         telefone:
 *           type: string
 *           description: Telefone com DDD
 *           example: "(11) 99999-9999"
 *         formacao:
 *           type: string
 *           description: Formação acadêmica
 *           example: Bacharelado em Engenharia de Software
 *         experiencia:
 *           type: string
 *           description: Experiência profissional
 *           example: 5 anos como desenvolvedor
 */
module.exports = (sequelize) => {
    class Candidato extends Model {
        static associate(models) {
            // Relacionamentos
            this.hasOne(models.Curriculo, {
                foreignKey: 'candidato_id',
                as: 'curriculo'
            });
            this.hasMany(models.Candidatura, {
                foreignKey: 'candidato_id',
                as: 'candidaturas'
            });
            this.belongsTo(models.Usuario, {
                foreignKey: 'usuario_id',
                as: 'usuario'
            });
        }
    }

    Candidato.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefone: DataTypes.STRING,
        formacao: DataTypes.STRING,
        experiencia: DataTypes.TEXT,
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'usuarios',
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'Candidato',
        tableName: 'candidatos'
    });

    return Candidato;
};
