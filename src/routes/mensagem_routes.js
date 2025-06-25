const express = require('express');
const router = express.Router();
const MensagemController = require('../controllers/mensagem_controller');
const authMiddleware = require('../middlewares/auth_middleware');

router.post('/', authMiddleware, MensagemController.create);
router.get('/', authMiddleware, MensagemController.findAll);
router.get('/:id', authMiddleware, MensagemController.findById);
router.delete('/', authMiddleware, MensagemController.delete);

module.exports = router;
