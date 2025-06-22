const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Entrevista extends Model {
        static associate(models) {
            // Relacionamentos
            this.belongsTo(models.Candidatura, {
                foreignKey: 'candidatura_id',
                as: 'candidatura'
            });
            this.belongsTo(models.Entrevistador, {
                foreignKey: 'entrevistador_id',
                as: 'entrevistador'
            });
        }
    }

    Entrevista.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        candidatura_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        entrevistador_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        data_entrevista: DataTypes.DATE,
        hora_entrevista: DataTypes.TIME,
        local_ou_link: DataTypes.STRING,
        observacoes: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Entrevista',
        tableName: 'entrevistas'
    });

    return Entrevista;
};
