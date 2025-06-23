const express = require('express');
const authorize = require('../middlewares/authorize_middleware');

function baseRouter(controller, permissions = {}, options = {}) {
    const router = express.Router();
    const { includeAdmin = true } = options; // Por padrão, admin tem acesso

    const {
        create = [],
        findAll = [],
        findByPk = [],
        update = [],
        delete: deletePerm = []
    } = permissions;

    // Função para adicionar admin se necessário
    const processPermissions = (perms) => {
        if (includeAdmin && !perms.includes('Administrador')) {
            return ['Administrador', ...perms];
        }
        return perms;
    };

    router.post('/', authorize(processPermissions(create)), controller.create.bind(controller));
    router.get('/', authorize(processPermissions(findAll)), controller.findAll.bind(controller));
    router.get('/:id', authorize(processPermissions(findByPk)), controller.findByPk.bind(controller));
    router.put('/:id', authorize(processPermissions(update)), controller.update.bind(controller));
    router.delete('/:id', authorize(processPermissions(deletePerm)), controller.delete.bind(controller));

    return router;
}

module.exports = baseRouter;
