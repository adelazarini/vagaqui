const curriculoController = require('../controllers/curriculo_controller');
const baseRouter = require('./base_router');

const router = baseRouter(curriculoController);

// Rota específica
router.get('/candidato/:candidato_id', curriculoController.buscarPorCandidatoId.bind(curriculoController));

module.exports = router;
