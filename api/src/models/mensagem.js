const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Mensagem:
 *       type: object
 *       required:
 *         - candidaturaId
 *         - participantes
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único do documento MongoDB
 *           example: 5f8d04a0b54764421b7156c9
 *           readOnly: true
 *         candidaturaId:
 *           type: integer
 *           description: ID da candidatura (referência ao PostgreSQL)
 *           example: 7
 *         mensagens:
 *           type: array
 *           description: Array de mensagens da conversa
 *           items:
 *             type: object
 *             required:
 *               - usuarioId
 *               - usuarioNome
 *               - conteudo
 *             properties:
 *               usuarioId:
 *                 type: integer
 *                 description: ID do usuário que enviou a mensagem
 *                 example: 23
 *               usuarioNome:
 *                 type: string
 *                 description: Nome do usuário que enviou a mensagem
 *                 example: Andre Ltda
 *               conteudo:
 *                 type: string
 *                 description: Conteúdo da mensagem
 *                 example: Você foi selecionado para o processo seletivo
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 description: Data e hora do envio
 *                 example: 2025-07-04T23:46:47.512Z
 *               _id:
 *                 type: string
 *                 description: ID único da mensagem
 *                 example: 686867e7d83739720ea74c36
 *         participantes:
 *           type: array
 *           description: IDs dos usuários participantes da conversa
 *           items:
 *             type: integer
 *           example: [23, 45]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação do documento
 *           readOnly: true
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização
 *           readOnly: true
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CandidaturaComMensagens:
 *       type: object
 *       properties:
 *         candidaturaId:
 *           type: integer
 *           description: ID da candidatura
 *           example: 7
 *         mensagens:
 *           type: array
 *           description: Lista de mensagens
 *           items:
 *             type: object
 *             properties:
 *               usuarioId:
 *                 type: integer
 *               usuarioNome:
 *                 type: string
 *               conteudo:
 *                 type: string
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *               _id:
 *                 type: string
 *               candidaturaId:
 *                 type: integer
 *         ultimaMensagem:
 *           type: object
 *           description: Última mensagem enviada
 *           properties:
 *             usuarioId:
 *               type: integer
 *             usuarioNome:
 *               type: string
 *             conteudo:
 *               type: string
 *             timestamp:
 *               type: string
 *               format: date-time
 *             _id:
 *               type: string
 *             candidaturaId:
 *               type: integer
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     EnviarMensagemInput:
 *       type: object
 *       required:
 *         - candidaturaId
 *         - usuarioId
 *         - usuarioNome
 *         - conteudo
 *       properties:
 *         candidaturaId:
 *           type: integer
 *           description: ID da candidatura
 *           example: 7
 *         usuarioId:
 *           type: integer
 *           description: ID do usuário remetente
 *           example: 23
 *         usuarioNome:
 *           type: string
 *           description: Nome do usuário remetente
 *           example: Andre Ltda
 *         conteudo:
 *           type: string
 *           description: Conteúdo da mensagem
 *           example: Olá, gostaríamos de agendar uma entrevista
 */

const MensagemSchema = new mongoose.Schema({
    candidaturaId: {
        type: Number,
        required: true
    },
    mensagens: [{
        usuarioId: {
            type: Number,
            required: true
        },
        usuarioNome: {
            type: String,
            required: true
        },
        conteudo: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    participantes: [{
        type: Number,
        required: true
    }]
});

module.exports = mongoose.model('Mensagem', MensagemSchema);
