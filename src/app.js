const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

// Importar rotas
const candidatoRoutes = require('./routes/candidato_routes');
//const empresaRoutes = require('./routes/empresa_routes');
//const vagaRoutes = require('./routes/vaga_routes');
//const curriculoRoutes = require('./routes/curriculo_routes');
//const candidaturaRoutes = require('./routes/candidatura_routes');
//const entrevistadorRoutes = require('./routes/entrevistador_routes');
//const entrevistaRoutes = require('./routes/entrevista_routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/candidatos', candidatoRoutes);
//app.use('/api/empresas', empresaRoutes);
//app.use('/api/vagas', vagaRoutes);
//app.use('/api/curriculos', curriculoRoutes);
//app.use('/api/candidaturas', candidaturaRoutes);
//app.use('/api/entrevistadores', entrevistadorRoutes);
//app.use('/api/entrevistas', entrevistaRoutes);

// Sincronizar banco de dados
sequelize.sync({ force: false })
    .then(() => console.log('Banco de dados sincronizado'))
    .catch(err => console.error('Erro ao sincronizar banco de dados:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;

//npm init -y
//npm install express sequelize pg pg-hstore cors dotenv
//npm install --save-dev nodemon

