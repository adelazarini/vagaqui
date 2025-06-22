const express = require('express');
const candidaturaController = require('../controllers/candidatura_controller');
const baseRouter = require('./base_routes');

const router = baseRouter(candidaturaController);

// Rota de filtro
router.get('/filter', candidaturaController.filter.bind(candidaturaController));

module.exports = router;
