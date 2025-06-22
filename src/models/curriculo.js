const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Curriculo extends Model {
        static associate(models) {
            // Relacionamentos
            this.belongsTo(models.Candidato, {
                foreignKey: 'candidato_id',
                as: 'candidato'
            });
            this.hasMany(models.Candidatura, {
                foreignKey: 'curriculo_id',
                as: 'candidaturas'
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
