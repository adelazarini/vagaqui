const { Model, DataTypes } = require('sequelize');
/**
 * @swagger
 * components:
 *   schemas:
 *     Vaga:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da vaga
 *           example: 1
 *         titulo:
 *           type: string
 *           description: Título da vaga
 *           example: Desenvolvedor Full Stack
 *         descricao:
 *           type: string
 *           description: Descrição da vaga
 *           example: Vaga para desenvolvedor experiente
 *         salario:
 *           type: number
 *           format: float
 *           description: Salário da vaga
 *           example: 5000.00
 *         localizacao:
 *           type: string
 *           description: Localização da vaga
 *           example: São Paulo, SP
 *         data_publicacao:
 *           type: string
 *           format: date
 *           description: Data de publicação da vaga
 *           example: 2025-06-23
 *         empresa_id:
 *           type: integer
 *           description: ID da empresa que publicou a vaga
 *           example: 1
 */
module.exports = (sequelize) => {
    class Vaga extends Model {
        static associate(models) {
            // Relacionamentos
            this.belongsTo(models.Empresa, {
                foreignKey: 'empresa_id',
                as: 'empresa',
                onDelete: 'CASCADE'
            });
            this.hasMany(models.Candidatura, {
                foreignKey: 'vaga_id',
                as: 'candidaturas',
                onDelete: 'CASCADE'
            });
        }
    }

    Vaga.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descricao: DataTypes.TEXT,
        salario: DataTypes.FLOAT,
        localizacao: DataTypes.STRING,
        data_publicacao: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        data_encerramento: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },

        empresa_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ativo: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    }, {
        sequelize,
        modelName: 'Vaga',
        tableName: 'vagas'
    });

    return Vaga;
};
