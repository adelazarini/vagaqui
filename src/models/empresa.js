const { Model, DataTypes } = require('sequelize');

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
