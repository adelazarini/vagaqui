const { Model, DataTypes } = require('sequelize');

/**
 * @swagger
 * components:
 *   schemas:
 *     Entrevistador:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do entrevistador
 *           example: 1
 *         nome:
 *           type: string
 *           description: Nome do entrevistador
 *           example: Ana Paula
 *         cargo:
 *           type: string
 *           description: Cargo do entrevistador
 *           example: Gerente de RH
 *         usuario_id:
 *           type: integer
 *           description: ID do usuário associado ao entrevistador
 *           example: 1
 *    
 */

module.exports = (sequelize) => {
    class Entrevistador extends Model {
        static associate(models) {
            // Relacionamentos
            this.belongsTo(models.Usuario, {
                foreignKey: 'usuario_id',
                as: 'usuario'
            });
        }
    }

    Entrevistador.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cargo: {
            type: DataTypes.STRING,
            allowNull: true
        },
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
        modelName: 'Entrevistador',
        tableName: 'entrevistadores',
        timestamps: true
    });

    return Entrevistador;
};
