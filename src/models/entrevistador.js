const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Entrevistador extends Model {
        static associate(models) {
            // Relacionamentos
            this.belongsTo(models.Empresa, {
                foreignKey: 'empresa_id',
                as: 'empresa'
            });
            this.hasMany(models.Entrevista, {
                foreignKey: 'entrevistador_id',
                as: 'entrevistas'
            });
            this.belongsTo(models.Usuario, {
                foreignKey: 'usuario_id',
                as: 'usuario'
            });
        }
    }

    Entrevistador.init({
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
            unique: true
        },
        cargo: DataTypes.STRING,
        empresa_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Entrevistador',
        tableName: 'entrevistadores'
    });

    return Entrevistador;
};
