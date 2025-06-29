const express = require('express');
const candidatoController = require('../controllers/candidato_controller');
const authorize = require('../middlewares/authorize_middleware');

const router = express.Router();

const permissions = {
    create: ['Candidato'],
    findAll: ['Empresa', 'Entrevistador', 'Administrador'],
    findByPk: ['Candidato', 'Empresa', 'Entrevistador', 'Administrador'],
    update: ['Candidato'],
    delete: ['Candidato', 'Administrador']
};

// Rotas protegidas com autorização
router.get('/',
    authorize(permissions.findAll),
    candidatoController.findAll.bind(candidatoController)
);

router.get('/dashboard',
    authorize(['Candidato']),
    candidatoController.getDashboard.bind(candidatoController)
);

router.get('/usuario',
    authorize(permissions.findByPk),
    candidatoController.findByUsuario.bind(candidatoController)
);



router.get('/email/:email',
    authorize(permissions.findByPk),
    candidatoController.buscarPorEmail.bind(candidatoController)
);

router.post('/',
    authorize(permissions.create),
    candidatoController.create.bind(candidatoController)
);

router.get('/:id',
    authorize(permissions.findByPk),
    candidatoController.findByPk.bind(candidatoController)
);

router.put('/:id',
    authorize(permissions.update),
    candidatoController.update.bind(candidatoController)
);

router.delete('/:id',
    authorize(permissions.delete),
    candidatoController.delete.bind(candidatoController)
);


router.post('/curriculo',
    authorize(['Candidato']),
    candidatoController.uploadCurriculo.bind(candidatoController)
);

module.exports = router;
