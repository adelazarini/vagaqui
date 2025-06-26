const express = require('express');
const candidaturaController = require('../controllers/candidatura_controller');
const authorize = require('../middlewares/authorize_middleware');

const router = express.Router();

const permissions = {
    create: ['Candidato'],
    findAll: ['Empresa', 'Entrevistador', 'Administrador'],
    findByPk: ['Candidato', 'Empresa', 'Entrevistador', 'Administrador'],
    update: ['Empresa', 'Entrevistador'],
    delete: ['Empresa', 'Administrador']
};

router.get('/',
    authorize(permissions.findAll),
    candidaturaController.findAll.bind(candidaturaController)
);

router.get('/:id',
    authorize(permissions.findByPk),
    candidaturaController.findByPk.bind(candidaturaController)
);

router.get('/filter',
    authorize(permissions.findAll),
    candidaturaController.filter.bind(candidaturaController)
);

router.post('/',
    authorize(permissions.create),
    candidaturaController.create.bind(candidaturaController)
);

router.put('/:id',
    authorize(permissions.update),
    candidaturaController.update.bind(candidaturaController)
);

router.delete('/:id',
    authorize(permissions.delete),
    candidaturaController.delete.bind(candidaturaController)
);

// Rotas específicas de candidatura
router.get('/vaga/:vaga_id',
    authorize(permissions.findAll),
    candidaturaController.buscarPorVagaId.bind(candidaturaController)
);

router.patch('/:id/status',
    authorize(permissions.update),
    candidaturaController.atualizarStatus.bind(candidaturaController)
);

module.exports = router;
