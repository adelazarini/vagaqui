const express = require('express');
const vagaController = require('../controllers/vaga_controller');
const baseRouter = require('./base_routes');

const router = baseRouter(vagaController);

// Rota de filtro
router.get('/filter', vagaController.filter.bind(vagaController));

module.exports = router;
