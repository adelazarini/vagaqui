const vagaController = require('../controllers/vaga_controller');
const baseRouter = require('./base_routes');
const authorize = require('../middlewares/authorize_middleware');

const permissions = {
    create: ['Empresa', 'Adminstrador'],
    findAll: ['Candidato', 'Empresa', 'Entrevistador'],
    findByPk: ['Candidato', 'Empresa', 'Entrevistador'],
    update: ['Empresa'],
    delete: ['Empresa']
};

const router = baseRouter(vagaController, permissions);

router.get('/filter', authorize(['Candidato', 'Empresa', 'Entrevistador']), vagaController.filter.bind(vagaController));

router.post('/create', authorize(['Adminstrador', 'Empresa']), vagaController.create.bind(vagaController));

module.exports = router;
