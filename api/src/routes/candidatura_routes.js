const express = require('express');
const candidaturaController = require('../controllers/candidatura_controller');
const authorize = require('../middlewares/authorize_middleware');

const router = express.Router();

const permissions = {
    create: ['Candidato'],
    findAll: ['Empresa', 'Entrevistador', 'Administrador', 'Candidato'],
    findByPk: ['Candidato', 'Empresa', 'Entrevistador', 'Administrador', 'Usuario'],
    update: ['Empresa', 'Entrevistador'],
    delete: ['Empresa', 'Administrador', 'Candidato'],
};

//Busca todas as candidaturas do candidato logado
router.get('/',
    authorize(permissions.findAll),
    candidaturaController.buscarCandidaturasDoCandidato.bind(candidaturaController)
);

// Busca uma candidatura por ID
router.get('/:id',
    authorize(permissions.findByPk),
    candidaturaController.findByPk.bind(candidaturaController)
);

router.get('/filter',
    authorize(permissions.findAll),
    candidaturaController.filter.bind(candidaturaController)
);

//criação de candidatura
router.post('/',
    authorize(permissions.create),
    candidaturaController.create.bind(candidaturaController)
);

// Atualização de candidatura
router.put('/:id',
    authorize(permissions.update),
    candidaturaController.update.bind(candidaturaController)
);

// Exclusão de candidatura
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
