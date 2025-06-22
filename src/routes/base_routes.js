const express = require('express');

function baseRouter(controller) {
    const router = express.Router();

    router.post('/', controller.create.bind(controller));
    router.get('/', controller.findAll.bind(controller));
    router.get('/:id', controller.findByPk.bind(controller));
    router.put('/:id', controller.update.bind(controller));
    router.delete('/:id', controller.delete.bind(controller));

    return router;
}

module.exports = baseRouter;
