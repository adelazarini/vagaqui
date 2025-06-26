const express = require('express');
const vagaController = require('../controllers/vaga_controller');
const authorize = require('../middlewares/authorize_middleware');

const authMiddleware = require('../middlewares/auth_middleware');

const router = express.Router();

router.use(authMiddleware);

const permissions = {
    create: ['Empresa', 'Administrador'],
    findAll: ['Candidato', 'Empresa', 'Entrevistador', 'Administrador'],
    findByPk: ['Candidato', 'Empresa', 'Entrevistador', 'Administrador'],
    update: ['Empresa', 'Administrador'],
    delete: ['Empresa', 'Administrador'],
    filterfilter: ['Candidato', 'Empresa', 'Entrevistador', 'Administrador']
};

//CRUD
router.post('/',
    authorize(permissions.create),
    vagaController.create.bind(vagaController)
);

router.get('/',
    authorize(permissions.findAll),
    vagaController.findAll.bind(vagaController)
);

router.get('/filter',
    authorize(permissions.filter),
    vagaController.filter.bind(vagaController)
);

router.get('/:id',
    authorize(permissions.findByPk),
    vagaController.findByPk.bind(vagaController)
);

router.put('/:id',
    authorize(permissions.update),
    vagaController.update.bind(vagaController)
);

router.delete('/:id',
    authorize(permissions.delete),
    vagaController.delete.bind(vagaController)
);

module.exports = router;
