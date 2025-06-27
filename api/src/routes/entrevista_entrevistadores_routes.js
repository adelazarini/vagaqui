const express = require('express');
const entrevistaEntrevistadoresController = require('../controllers/entrevista_entrevistadores_controller');
const authorize = require('../middlewares/authorize_middleware');
const authMiddleware = require('../middlewares/auth_middleware');

const router = express.Router();

router.use(authMiddleware);

const permissions = {
    criar: ['Entrevistador'],
    buscar: ['Entrevistador'],
    atualizar: ['Entrevistador']
};

router.post('/',
    authorize(permissions.criar),
    entrevistaEntrevistadoresController.criarEntrevistaEntrevistador.bind(entrevistaEntrevistadoresController)
);

router.get('/minhas-entrevistas',
    authorize(permissions.buscar),
    entrevistaEntrevistadoresController.buscarEntrevistasDoEntrevistador.bind(entrevistaEntrevistadoresController)
);

router.put('/:id',
    authorize(permissions.atualizar),
    entrevistaEntrevistadoresController.atualizarEntrevistaEntrevistador.bind(entrevistaEntrevistadoresController)
);

module.exports = router;
