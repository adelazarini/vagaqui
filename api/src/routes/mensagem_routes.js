const express = require('express');
const MensagemController = require('../controllers/mensagem_controller');
const authMiddleware = require('../middlewares/auth_middleware');
const authorize = require('../middlewares/authorize_middleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/candidatura/:candidaturaId',
    authorize(['Candidato', 'Empresa', 'Entrevistador']),
    MensagemController.enviarMensagem
);

router.get('/candidatura/:candidaturaId',
    authorize(['Candidato', 'Empresa', 'Entrevistador']),
    MensagemController.listarMensagensPorCandidatura
);

router.get('/usuario',
    authorize(['Candidato', 'Empresa', 'Entrevistador']),
    MensagemController.obterMensagensPorUsuario
);

router.get('/candidaturas/:usuarioId',
    authorize(['Candidato', 'Empresa', 'Entrevistador']),
    MensagemController.obterCandidaturasComMensagens
);

module.exports = router;
