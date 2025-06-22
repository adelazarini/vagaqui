const vagaController = require('../controllers/vaga_controller');
const baseRouter = require('./base_routes');
const authorize = require('../middlewares/authorize');

//exemplo de como usar as permissoes
const permissions = {
    create: ['Empresa'],
    findAll: ['Candidato', 'Empresa', 'Entrevistador'],
    findByPk: ['Candidato', 'Empresa', 'Entrevistador'],
    update: ['Empresa'],
    delete: ['Empresa']
};

const router = baseRouter(vagaController, permissions);

//rota de filtro e como exemplo com exemplo autorização
router.get('/filter', authorize(['Candidato', 'Empresa', 'Entrevistador']), vagaController.filter.bind(vagaController));

module.exports = router;
