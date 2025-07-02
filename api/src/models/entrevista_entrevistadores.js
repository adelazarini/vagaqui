const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class EntrevistaEntrevistadores extends Model {
        static associate(models) {
            this.belongsTo(models.Entrevista, {
                foreignKey: 'entrevista_id',
                as: 'entrevista'
            });
            this.belongsTo(models.Entrevistador, {
                foreignKey: 'entrevistador_id',
                as: 'entrevistador'
            });
        }
    }

    EntrevistaEntrevistadores.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        entrevista_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'entrevistas', key: 'id' }
        },
        entrevistador_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'entrevistadores', key: 'id' }
        },
        data_entrevista: {
            type: DataTypes.DATE,
            allowNull: true
        },
        hora_entrevista: {
            type: DataTypes.TIME,
            allowNull: true
        },
        local_link: {
            type: DataTypes.STRING,
            allowNull: true
        },
        observacoes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status_entrevista: {
            type: DataTypes.ENUM('Combinar', 'Agendada', 'Aprovado', 'Reprovado', 'Cancelada'),
            allowNull: false,
            defaultValue: 'Combinar'
        },
        empresa_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'empresas', key: 'id' }
        },
    }, {
        sequelize,
        modelName: 'EntrevistaEntrevistadores',
        tableName: 'entrevista_entrevistadores',
        underscored: true,
        timestamps: true
    });

    return EntrevistaEntrevistadores;
};
