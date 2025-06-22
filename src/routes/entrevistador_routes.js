const express = require('express');
const entrevistadorController = require('../controllers/entrevistador_controller');
const baseRouter = require('./base_routes');

const router = baseRouter(entrevistadorController);

// Rota de filtro
router.get('/filter', entrevistadorController.filter.bind(entrevistadorController));

module.exports = router;
