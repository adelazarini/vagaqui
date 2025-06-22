const express = require('express');
const router = express.Router();
const candidatoController = require('../controllers/candidato_controller');

router.post('/', candidatoController.create.bind(candidatoController));
router.get('/', candidatoController.findAll.bind(candidatoController));
router.get('/:id', candidatoController.findByPk.bind(candidatoController));
router.put('/:id', candidatoController.update.bind(candidatoController));
router.delete('/:id', candidatoController.delete.bind(candidatoController));

// Rota específica
router.get('/email/:email', candidatoController.buscarPorEmail.bind(candidatoController));

module.exports = router;
