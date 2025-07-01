const express = require('express');
const entrevistaController = require('../controllers/entrevista_controller');
const authorize = require('../middlewares/authorize_middleware');
const authMiddleware = require('../middlewares/auth_middleware');

const router = express.Router();

router.use(authMiddleware);

const permissions = {
    create: ['Administrador', 'Empresa'],
    findAll: ['Administrador', 'Empresa', 'Entrevistador', 'Candidato'],
    findByPk: ['Administrador', 'Empresa', 'Entrevistador', 'Candidato'],
    update: ['Administrador', 'Empresa'],
    delete: ['Administrador', 'Empresa', 'Entrevistador'],
    filter: ['Administrador', 'Empresa', 'Entrevistador', 'Candidato']
};

// CRUD Básico
router.post('/',
    authorize(permissions.create),
    entrevistaController.create.bind(entrevistaController)
);

router.get('/',
    authorize(permissions.findAll),
    entrevistaController.findAll.bind(entrevistaController)
);


router.get('/:id',
    authorize(permissions.findByPk),
    entrevistaController.findByPk.bind(entrevistaController)
);

router.put('/:id',
    authorize(permissions.update),
    entrevistaController.update.bind(entrevistaController)
);

router.delete('/:id',
    authorize(permissions.delete),
    entrevistaController.delete.bind(entrevistaController)
);

router.get('/:id/entrevistadores',
    authorize(['Administrador', 'Empresa', 'Entrevistador']),
    entrevistaController.listarEntrevistadores.bind(entrevistaController)
);

router.post('/:id/entrevistadores',
    authorize(['Administrador', 'Empresa']),
    entrevistaController.adicionarEntrevistadores.bind(entrevistaController)
);

router.delete('/:id/entrevistadores/:entrevistadorId',
    authorize(['Administrador', 'Empresa', 'Entrevistador']),
    entrevistaController.removerEntrevistador.bind(entrevistaController)
);

router.get('/:id/completa',
    authorize(permissions.findByPk),
    entrevistaController.buscarEntrevistaCompleta.bind(entrevistaController)
);

router.get('/candidatura/:candidaturaId',
    authorize(permissions.findAll),
    entrevistaController.buscarPorCandidatura.bind(entrevistaController)
);

// Atualizar status da entrevista
router.patch('/:id/status',
    authorize(permissions.update),
    entrevistaController.updateStatus.bind(entrevistaController)
);

module.exports = router;
