const { Model, DataTypes } = require('sequelize');
/**
 * @swagger
 * components:
 *   schemas:
 *     Curriculo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do currículo
 *           example: 1
 *         url_documento:
 *           type: string
 *           description: URL do documento do currículo
 *           example: http://example.com/curriculo.pdf
 *         data_envio:
 *           type: string
 *           format: date
 *           description: Data de envio do currículo
 *           example: 2025-06-23
 *         candidato_id:
 *           type: integer
 *           description: ID do candidato
 *           example: 1
 */

module.exports = (sequelize) => {
    class Curriculo extends Model {
        static associate(models) {
            // Relacionamentos
            this.belongsTo(models.Candidato, {
                foreignKey: 'candidato_id',
                as: 'candidato'
            });
        }
    }

    Curriculo.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        url_documento: DataTypes.STRING,
        data_envio: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        candidato_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Curriculo',
        tableName: 'curriculos'
    });

    return Curriculo;
};
