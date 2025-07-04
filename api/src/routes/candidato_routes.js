const express = require('express');
const candidatoController = require('../controllers/candidato_controller');


const authorize = require('../middlewares/authorize_middleware');
const authMiddleware = require('../middlewares/auth_middleware');
const router = express.Router();
router.use(authMiddleware);

const permissions = {
    create: ['Candidato'],
    findAll: ['Empresa', 'Entrevistador', 'Administrador'],
    findByPk: ['Candidato', 'Empresa', 'Entrevistador', 'Administrador'],
    update: ['Candidato'],
    delete: ['Candidato', 'Administrador']
};


router.get('/dashboard',
    authorize(['Candidato']),
    candidatoController.getDashboard
);

router.put('/:id',
    authorize(permissions.update),
    candidatoController.update
);

module.exports = router;
