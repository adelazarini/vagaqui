const { Sequelize } = require('sequelize');
const config = require('../config/database');

const sequelize = new Sequelize(config.development);

const models = {
    Candidato: require('./candidato')(sequelize),
    Empresa: require('./empresa')(sequelize),
    Vaga: require('./vaga')(sequelize),
    Curriculo: require('./curriculo')(sequelize),
    Candidatura: require('./candidatura')(sequelize),
    Entrevistador: require('./entrevistador')(sequelize),
    Entrevista: require('./entrevista')(sequelize),
    Usuario: require('./usuario')(sequelize)
};

// Configurar associações
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

module.exports = {
    ...models,
    sequelize
};
