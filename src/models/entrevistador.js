const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Entrevistador extends Model {
        static associate(models) {
            // Relacionamentos
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
            unique: true,
            validate: {
                isEmail: true
            }
        },
        cargo: {
            type: DataTypes.STRING,
            allowNull: true
        },
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
        modelName: 'Entrevistador',
        tableName: 'entrevistadores',
        timestamps: true
    });

    return Entrevistador;
};
