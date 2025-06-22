const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Vaga extends Model {
        static associate(models) {
            // Relacionamentos
            this.belongsTo(models.Empresa, {
                foreignKey: 'empresa_id',
                as: 'empresa'
            });
            this.hasMany(models.Candidatura, {
                foreignKey: 'vaga_id',
                as: 'candidaturas'
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
        empresa_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Vaga',
        tableName: 'vagas'
    });

    return Vaga;
};
