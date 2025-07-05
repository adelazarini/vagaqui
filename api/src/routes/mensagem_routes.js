const express = require('express');
const MensagemController = require('../controllers/mensagem_controller');
const authMiddleware = require('../middlewares/auth_middleware');
const authorize = require('../middlewares/authorize_middleware');

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Mensagens
 *   description: Gerenciamento de mensagens entre usuários
 */

/**
 * @swagger
 * /mensagens/candidatura/{candidaturaId}:
 *   post:
 *     summary: Enviar mensagem para uma candidatura
 *     tags: [Mensagens]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: candidaturaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da candidatura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EnviarMensagemInput'
 *     responses:
 *       201:
 *         description: Mensagem enviada com sucesso
 *       403:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /mensagens/candidatura/{candidaturaId}:
 *   get:
 *     summary: Listar mensagens de uma candidatura
 *     tags: [Mensagens]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: candidaturaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da candidatura
 *     responses:
 *       200:
 *         description: Lista de mensagens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mensagem'
 *       403:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /mensagens/usuario:
 *   get:
 *     summary: Obter mensagens do usuário logado
 *     tags: [Mensagens]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Mensagens do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mensagem'
 *       403:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /mensagens/candidatura/{usuarioId}:
 *   get:
 *     summary: Obter candidaturas com mensagens para um usuário
 *     tags: [Mensagens]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de candidaturas com mensagens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CandidaturaComMensagens'
 *       403:
 *         description: Não autorizado
 */

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

router.get('/candidatura/:usuarioId',
    authorize(['Candidato', 'Empresa', 'Entrevistador']),
    MensagemController.obterCandidaturasComMensagens
);

module.exports = router;
