const entrevistadorController = require('../controllers/entrevistadorController');
const baseRouter = require('./baseRouter');

const router = baseRouter(entrevistadorController);

// Rota específica
router.get('/email/:email', entrevistadorController.buscarPorEmail.bind(entrevistadorController));

module.exports = router;
