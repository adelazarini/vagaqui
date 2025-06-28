const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Entrevista extends Model {
        static associate(models) {
            // Relacionamentos
            this.belongsTo(models.Candidatura, {
                foreignKey: 'candidatura_id',
                as: 'candidatura'
            });
            // Relação N:N com Entrevistador
            this.belongsToMany(models.Entrevistador, {
                through: 'entrevista_entrevistadores',
                foreignKey: 'entrevista_id',
                otherKey: 'entrevistador_id',
                as: 'entrevistadores'
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
            allowNull: false,
            references: {
                model: 'candidaturas',
                key: 'id'
            }
        },

        observacoes: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Entrevista',
        tableName: 'entrevistas',
        underscored: true

    });

    return Entrevista;
};
