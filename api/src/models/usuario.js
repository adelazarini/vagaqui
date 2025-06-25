const { Model, DataTypes } = require('sequelize');

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do usuário
 *           example: 1
 *         nome:
 *           type: string
 *           description: Nome do usuário
 *           example: João da Silva
 *         email:
 *           type: string
 *           description: Email do usuário
 *           example: joao@email.com
 *         senha:
 *           type: string
 *           description: Senha do usuário
 *           example: senha123
 *         tipo_usuario:
 *           type: string
 *           description: Tipo de usuário (Administrador, Empresa, Entrevistador, Candidato)
 *           example: Candidato
 *         token:
 *           type: string
 *           description: Token de autenticação
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         ultimo_login:
 *           type: string
 *           format: date-time
 *           description: Data e hora do último login
 *           example: 2025-06-23T10:00:00.000Z
 */
module.exports = (sequelize) => {
    class Usuario extends Model {
        static associate(models) {
            // Relacionamentos
            this.hasOne(models.Candidato, {
                foreignKey: 'usuario_id',
                as: 'candidato'
            });
            this.hasOne(models.Empresa, {
                foreignKey: 'usuario_id',
                as: 'empresa'
            });
            this.hasOne(models.Entrevistador, {
                foreignKey: 'usuario_id',
                as: 'entrevistador'
            });
        }
    }

    Usuario.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tipo_usuario: {
            type: DataTypes.ENUM('Administrador', 'Empresa', 'Entrevistador', 'Candidato'),
            allowNull: false
        },
        token: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ultimo_login: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Usuario',
        tableName: 'usuarios',

    });

    return Usuario;
};
