const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Empresa extends Model {
        static associate(models) {
            // Relacionamentos
            this.hasMany(models.Vaga, {
                foreignKey: 'empresa_id',
                as: 'vagas'
            });
            this.hasMany(models.Entrevistador, {
                foreignKey: 'empresa_id',
                as: 'entrevistadores'
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        cnpj: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        telefone: DataTypes.STRING,
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Empresa',
        tableName: 'empresas'
    });

    return Empresa;
};
