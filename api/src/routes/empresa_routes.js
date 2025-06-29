const express = require('express');
const EmpresaController = require('../controllers/empresa_controller');
const authorize = require('../middlewares/authorize_middleware');
const authMiddleware = require('../middlewares/auth_middleware');

const router = express.Router();
router.use(authMiddleware);

const permissions = {
    create: ['Administrador'],
    findAll: ['Empresa', 'Entrevistador', 'Administrador'],
    findByPk: ['Entrevistador', 'Empresa', 'Administrador'],
    update: ['Empresa', 'Administrador'],
    delete: ['Administrador']
};

router.get('/dashboard',
    authorize(['Empresa']),
    EmpresaController.obterDadosDashboard
);

router.get('/email/:email',
    authorize(permissions.findByPk),
    EmpresaController.buscarPorEmail
);

router.get('/cnpj/:cnpj',
    authorize(permissions.findByPk),
    EmpresaController.buscarPorCnpj
);

router.post('/',
    authorize(permissions.create),
    EmpresaController.create.bind(EmpresaController)
);

router.get('/:id',
    authorize(permissions.findByPk),
    EmpresaController.findByPk.bind(EmpresaController)
);

router.put('/:id',
    authorize(permissions.update),
    EmpresaController.update.bind(EmpresaController)
);

router.delete('/:id',
    authorize(permissions.delete),
    EmpresaController.delete.bind(EmpresaController)
);

module.exports = router;
