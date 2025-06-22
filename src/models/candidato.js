const { Model, DataTypes } = require('sequelize');

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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        telefone: DataTypes.STRING,
        formacao: DataTypes.STRING,
        experiencia: DataTypes.TEXT,
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Candidato',
        tableName: 'candidatos'
    });

    return Candidato;
};
