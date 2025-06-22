const express = require('express');
const authorize = require('../middlewares/authorize');

function baseRouter(controller, permissions = {}) {
    const router = express.Router();

    const {
        create = [],
        findAll = [],
        findByPk = [],
        update = [],
        delete: deletePerm = []
    } = permissions;

    router.post('/', authorize(create), controller.create.bind(controller));
    router.get('/', authorize(findAll), controller.findAll.bind(controller));
    router.get('/:id', authorize(findByPk), controller.findByPk.bind(controller));
    router.put('/:id', authorize(update), controller.update.bind(controller));
    router.delete('/:id', authorize(deletePerm), controller.delete.bind(controller));

    return router;
}

module.exports = baseRouter;
