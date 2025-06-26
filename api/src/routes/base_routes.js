const express = require('express');
const authorize = require('../middlewares/authorize_middleware');
const authMiddleware = require('../middlewares/auth_middleware');

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

    router.post('/',
        authMiddleware,
        authorize(...processPermissions(create)),
        controller.create.bind(controller)
    );

    router.get('/',
        authMiddleware,
        authorize(...processPermissions(findAll)),
        controller.findAll.bind(controller)
    );

    router.get('/:id',
        authMiddleware,
        authorize(...processPermissions(findByPk)),
        controller.findByPk.bind(controller)
    );

    router.put('/:id',
        authMiddleware,
        authorize(...processPermissions(update)),
        controller.update.bind(controller)
    );

    router.delete('/:id',
        authMiddleware,
        authorize(...processPermissions(deletePerm)),
        controller.delete.bind(controller)
    );

    return router;
}

module.exports = baseRouter;
