module.exports = (sequelize, DataTypes) => {
    const Entrevista_Entrevistadores = sequelize.define('Entrevista_Entrevistadores', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        entrevista_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'entrevistas',
                key: 'id'
            }
        },
        entrevistador_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'entrevistadores',
                key: 'id'
            }
        },
        data_entrevista: {
            type: DataTypes.DATE,
            allowNull: false
        },
        hora_entrevista: {
            type: DataTypes.TIME,
            allowNull: false
        },
        local_link: {
            type: DataTypes.STRING,
            allowNull: true
        },
        observacoes: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'entrevista_entrevistadores',
        underscored: true
    });

    Entrevista_Entrevistadores.associate = (models) => {
        Entrevista_Entrevistadores.belongsTo(models.Entrevista, {
            foreignKey: 'entrevista_id'
        });
        Entrevista_Entrevistadores.belongsTo(models.Entrevistador, {
            foreignKey: 'entrevistador_id'
        });
    };

    return Entrevista_Entrevistadores;
};
