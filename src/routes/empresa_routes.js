const empresaController = require('../controllers/empresa_controller');
const baseRouter = require('./base_routes');

const router = baseRouter(empresaController);

// Rota específica
router.get('/email/:email', empresaController.buscarPorEmail.bind(empresaController));
router.get('/cnpj/:cnpj', empresaController.buscarPorCnpj.bind(empresaController));

module.exports = router;
