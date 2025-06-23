const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { sequelize } = require('./models');
const swaggerConfig = require('./swagger');
require('dotenv').config();

// Importar rotas
const candidatoRoutes = require('./routes/candidato_routes');
const empresaRoutes = require('./routes/empresa_routes');
const vagaRoutes = require('./routes/vaga_routes');
const curriculoRoutes = require('./routes/curriculo_routes');
const candidaturaRoutes = require('./routes/candidatura_routes');
const entrevistadorRoutes = require('./routes/entrevistador_routes');
const entrevistaRoutes = require('./routes/entrevista_routes');
const authRoutes = require('./routes/auth_routes');

// Importar middleware de autenticação
const authMiddleware = require('./middlewares/auth_middleware');

const app = express();

swaggerConfig(app);

// Middlewares
app.use(cors());
app.use(express.json());

// Logger de requisições
app.use(morgan('dev'));

if (!process.env.JWT_SECRET) {
    console.error('ERRO: JWT_SECRET não definido');
    process.exit(1);
}

// Middleware de log detalhado
app.use((req, res, next) => {
    console.log(`
    ------- REQUEST LOG -------
    Método: ${req.method}
    URL: ${req.url}
    Headers: ${JSON.stringify(req.headers)}
    Body: ${JSON.stringify(req.body)}
    Timestamp: ${new Date().toISOString()}
    ----------------------------
    `);
    next();
});

// Rotas públicas de autenticação
app.use('/api/auth', authRoutes);

// Middleware de autenticação para rotas protegidas
app.use('/api/candidato', authMiddleware);
app.use('/api/empresa', authMiddleware);
app.use('/api/vaga', authMiddleware);
app.use('/api/curriculo', authMiddleware);
app.use('/api/candidatura', authMiddleware);
app.use('/api/entrevistador', authMiddleware);
app.use('/api/entrevista', authMiddleware);

// Rotas
app.use('/api/candidato', candidatoRoutes);
app.use('/api/empresa', empresaRoutes);
app.use('/api/vaga', vagaRoutes);
app.use('/api/curriculo', curriculoRoutes);
app.use('/api/candidatura', candidaturaRoutes);
app.use('/api/entrevistador', entrevistadorRoutes);
app.use('/api/entrevista', entrevistaRoutes);

// Middleware para rotas não encontradas
app.use((req, res, next) => {
    res.status(404).json({ message: 'Rota não encontrada' });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
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
