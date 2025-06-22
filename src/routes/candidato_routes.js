const candidatoController = require('../controllers/candidato_controller');
const baseRouter = require('./base_router');

const router = baseRouter(candidatoController);

// Rota específica
router.get('/email/:email', candidatoController.buscarPorEmail.bind(candidatoController));

// Rota de filtro
router.get('/filter', candidatoController.filter.bind(candidatoController));

module.exports = router;
