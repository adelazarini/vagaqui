const curriculoController = require('../controllers/curriculo_controller');
const baseRouter = require('./base_routes');

const router = baseRouter(curriculoController);

router.get('/candidato/:candidato_id', curriculoController.buscarPorCandidatoId.bind(curriculoController));

module.exports = router;
