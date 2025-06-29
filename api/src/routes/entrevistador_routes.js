const express = require('express');
const entrevistadorController = require('../controllers/entrevistador_controller');
const authorize = require('../middlewares/authorize_middleware');

const router = express.Router();

const permissions = {
    create: ['Entrevistador'],
    findAll: ['Empresa', 'Entrevistador', 'Administrador'],
    findByPk: ['Entrevistador', 'Empresa', 'Administrador'],
    update: ['Entrevistador'],
    delete: ['Entrevistador', 'Administrador']
};

router.get('/',
    authorize(permissions.findAll),
    entrevistadorController.findAll.bind(entrevistadorController)
);

router.get('/dashboard',
    authorize(['Entrevistador']),
    entrevistadorController.getDashboard.bind(entrevistadorController)
);

router.get('/usuario',
    authorize(permissions.findByPk),
    entrevistadorController.findByUsuario.bind(entrevistadorController)
);

router.post('/',
    authorize(permissions.create),
    entrevistadorController.create.bind(entrevistadorController)
);

router.get('/:id',
    authorize(permissions.findByPk),
    entrevistadorController.findByPk.bind(entrevistadorController)
);

router.put('/:id',
    authorize(permissions.update),
    entrevistadorController.update.bind(entrevistadorController)
);

router.delete('/:id',
    authorize(permissions.delete),
    entrevistadorController.delete.bind(entrevistadorController)
);

module.exports = router;
