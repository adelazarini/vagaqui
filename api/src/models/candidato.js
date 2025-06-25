const { Model, DataTypes } = require('sequelize');
/**
 * @swagger
 * components:
 *   schemas:
 *     Candidato:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do candidato
 *           example: 1
 *         nome:
 *           type: string
 *           description: Nome do candidato
 *           example: João da Silva
 *         cpf:
 *           type: string
 *           description: CPF do candidato
 *           example: 123.456.789-00
 *         telefone:
 *           type: string
 *           description: Telefone do candidato
 *           example: (11) 99999-8888
 *         formacao:
 *           type: string
 *           description: Formação do candidato
 *           example: Engenharia de Software
 *         experiencia:
 *           type: string
 *           description: Experiência profissional do candidato
 *           example: 5 anos como desenvolvedor full stack
 *         usuario_id:
 *           type: integer
 *           description: ID do usuário associado ao candidato
 *           example: 1
 */
module.exports = (sequelize) => {
    class Candidato extends Model {
        static associate(models) {
            // Relacionamentos
            this.hasMany(models.Curriculo, {
                foreignKey: 'candidato_id',
                as: 'curriculos'
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
