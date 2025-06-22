const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

// Importar rotas
const candidatoRoutes = require('./routes/candidato_routes');
const empresaRoutes = require('./routes/empresa_routes');
const vagaRoutes = require('./routes/vaga_routes');
const curriculoRoutes = require('./routes/curriculo_routes');
//const candidaturaRoutes = require('./routes/candidatura_routes');
//const entrevistadorRoutes = require('./routes/entrevistador_routes');
//const entrevistaRoutes = require('./routes/entrevista_routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/candidato', candidatoRoutes);
app.use('/api/empresa', empresaRoutes);
app.use('/api/vaga', vagaRoutes);
app.use('/api/curriculo', curriculoRoutes);
//app.use('/api/candidatura', candidaturaRoutes);
//app.use('/api/entrevistadore', entrevistadorRoutes);
//app.use('/api/entrevista', entrevistaRoutes);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Rota não encontrada' });
});

// Sincronizar banco de dados
sequelize.sync({ force: false })
    .then(() => console.log('Banco de dados sincronizado'))
    .catch(err => console.error('Erro ao sincronizar banco de dados:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;



