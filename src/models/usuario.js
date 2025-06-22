const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Usuario extends Model {
        static associate(models) {
            // Relacionamentos
            this.hasOne(models.Candidato, {
                foreignKey: 'usuario_id',
                as: 'candidato'
            });
            this.hasOne(models.Empresa, {
                foreignKey: 'usuario_id',
                as: 'empresa'
            });
            this.hasOne(models.Entrevistador, {
                foreignKey: 'usuario_id',
                as: 'entrevistador'
            });
        }
    }

    Usuario.init({
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
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tipo_usuario: {
            type: DataTypes.ENUM('Administrador', 'Empresa', 'Entrevistador', 'Candidato'),
            allowNull: false
        },
        token: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Usuario',
        tableName: 'usuarios',

    });

    return Usuario;
};
