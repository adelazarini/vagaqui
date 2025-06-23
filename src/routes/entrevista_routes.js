const EntrevistaController = require('../controllers/entrevista_controller');
const authorize = require('../middlewares/authorize_middleware');
const baseRouter = require('./base_routes');

module.exports = (app) => {
    const controller = new EntrevistaController(app);
    const router = baseRouter(controller, {
        create: ['Administrador', 'Empresa'],
        findAll: ['Administrador', 'Empresa', 'Entrevistador'],
        findByPk: ['Administrador', 'Empresa', 'Entrevistador'],
        update: ['Administrador', 'Empresa', 'Entrevistador'],
        delete: ['Administrador', 'Empresa']
    });

    router.get('/:id/entrevistadores',
        authorize(['Administrador', 'Empresa', 'Entrevistador']),
        controller.listarEntrevistadores.bind(controller)
    );

    router.post('/:id/entrevistadores',
        authorize(['Administrador', 'Empresa']),
        controller.adicionarEntrevistadores.bind(controller)
    );

    router.delete('/:id/entrevistadores/:entrevistadorId',
        authorize(['Administrador', 'Empresa']),
        controller.removerEntrevistador.bind(controller)
    );

    router.get('/:id/completa',
        authorize(['Administrador', 'Empresa', 'Entrevistador']),
        controller.buscarEntrevistaCompleta.bind(controller)
    );

    router.get('/candidatura/:candidaturaId',
        authorize(['Administrador', 'Empresa', 'Entrevistador', 'Candidato']),
        controller.buscarPorCandidatura.bind(controller)
    );

    router.get('/filtro',
        authorize(['Administrador', 'Empresa', 'Entrevistador']),
        controller.filter.bind(controller)
    );

    return router;
};
