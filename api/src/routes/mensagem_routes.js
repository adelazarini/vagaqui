const express = require('express');

const MensagemController = require('../controllers/mensagem_controller');

const authorize = require('../middlewares/authorize_middleware');

const authMiddleware = require('../middlewares/auth_middleware');

const router = express.Router();

router.use(authMiddleware);


router.post('/candidatura/:candidaturaId',
    authorize(['Candidato', 'Empresa', 'Entrevistador']),
    MensagemController.enviarMensagem
);

router.get('/candidatura/:candidaturaId',
    authorize(['Candidato', 'Empresa', 'Entrevistador']),
    MensagemController.listarMensagens
);

module.exports = router;
