const { Model, DataTypes } = require('sequelize');
/**
 * @swagger
 * components:
 *   schemas:
 *     Empresa:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da empresa
 *           example: 1
 *         nome:
 *           type: string
 *           description: Nome da empresa
 *           example: Tech Solutions Ltda
 *         email:
 *           type: string
 *           description: Email da empresa
 *           example: contato@techsolutions.com.br
 *         cnpj:
 *           type: string
 *           description: CNPJ da empresa
 *           example: 12.345.678/0001-90
 *         telefone:
 *           type: string
 *           description: Telefone da empresa
 *           example: (11) 98765-4321
 *         usuario_id:
 *           type: integer
 *           description: ID do usuário associado à empresa
 *           example: 1
 *  
 * 
 */
module.exports = (sequelize) => {
    class Empresa extends Model {
        static associate(models) {
            // Relacionamentos
            this.hasMany(models.Vaga, {
                foreignKey: 'empresa_id',
                as: 'vagas'
            });

            this.belongsTo(models.Usuario, {
                foreignKey: 'usuario_id',
                as: 'usuario'
            });
        }
    }
    Empresa.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cnpj: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        telefone: DataTypes.STRING,
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
        modelName: 'Empresa',
        tableName: 'empresas'
    });

    return Empresa;
};
