/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Endpoints de autenticação de usuários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginInput:
 *       type: object
 *       required:
 *         - email
 *         - senha
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuário
 *           example: usuario@exemplo.com
 *         senha:
 *           type: string
 *           format: password
 *           description: Senha do usuário
 *           example: senha123
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterInput:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - senha
 *         - tipo_usuario
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome completo do usuário
 *           example: João Silva
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuário
 *           example: usuario@exemplo.com
 *         senha:
 *           type: string
 *           format: password
 *           description: Senha do usuário
 *           example: senha123
 *         tipo_usuario:
 *           type: string
 *           enum: [Candidato, Empresa, Entrevistador]
 *           description: Tipo de usuário
 *           example: Candidato

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autenticar usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticação
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nome:
 *                       type: string
 *                     email:
 *                       type: string
 *                     tipo_usuario:
 *                       type: string
 *       401:
 *         description: Credenciais inválidas
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nome:
 *                   type: string
 *                 email:
 *                   type: string
 *                 tipo_usuario:
 *                   type: string
 *       400:
 *         description: Dados inválidos
 */

const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth_controller');

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

module.exports = router;
