const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Candidatura extends Model {
        static associate(models) {
            // Relacionamentos
            this.belongsTo(models.Candidato, {
                foreignKey: 'candidato_id',
                as: 'candidato'
            });
            this.belongsTo(models.Vaga, {
                foreignKey: 'vaga_id',
                as: 'vaga'
            });

            this.hasOne(models.Entrevista, {
                foreignKey: 'candidatura_id',
                as: 'entrevista'
            });
        }
    }

    Candidatura.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        vaga_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        candidato_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        status: DataTypes.STRING,
        data_candidatura: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: 'Candidatura',
        tableName: 'candidaturas'
    });

    return Candidatura;
};
