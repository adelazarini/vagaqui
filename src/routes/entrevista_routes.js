const express = require('express');
const entrevistaController = require('../controllers/entrevista_controller');
const baseRouter = require('./base_router');

const router = baseRouter(entrevistaController);

// Rota de filtro
router.get('/filter', entrevistaController.filter.bind(entrevistaController));

module.exports = router;
