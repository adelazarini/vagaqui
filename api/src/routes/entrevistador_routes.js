const express = require('express');
const entrevistadorController = require('../controllers/entrevistador_controller');
const authorize = require('../middlewares/authorize_middleware');

const router = express.Router();

const permissions = {
    create: ['Entrevistador'],
    findAll: ['Empresa', 'Entrevistador', 'Administrador'],
    findByPk: ['Entrevistador', 'Empresa', 'Administrador'],
    update: ['Entrevistador'],
    delete: ['Entrevistador', 'Administrador']
};

/**
 * @swagger
 * tags:
 *   name: Entrevistadores
 *   description: Gerenciamento de entrevistadores
 */

/**
 * @swagger
 * /entrevistadores:
 *   get:
 *     summary: Listar todos os entrevistadores
 *     tags: [Entrevistadores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de entrevistadores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Entrevistador'
 *       403:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /entrevistadores/dashboard:
 *   get:
 *     summary: Obter dados do dashboard do entrevistador
 *     tags: [Entrevistadores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do dashboard do entrevistador
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalEntrevistas:
 *                   type: integer
 *                   example: 10
 *                 entrevistasAgendadas:
 *                   type: integer
 *                   example: 5
 *                 entrevistasRealizadas:
 *                   type: integer
 *                   example: 3
 *       403:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /entrevistadores/usuario:
 *   get:
 *     summary: Obter entrevistador por usuário
 *     tags: [Entrevistadores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do entrevistador
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entrevistador'
 *       404:
 *         description: Entrevistador não encontrado
 */

/**
 * @swagger
 * /entrevistadores:
 *   post:
 *     summary: Criar novo entrevistador
 *     tags: [Entrevistadores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EntrevistadorInput'
 *     responses:
 *       201:
 *         description: Entrevistador criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entrevistador'
 *       403:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /entrevistadores/{id}:
 *   get:
 *     summary: Obter detalhes do entrevistador
 *     tags: [Entrevistadores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do entrevistador
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entrevistador'
 *       404:
 *         description: Entrevistador não encontrado
 */

/**
 * @swagger
 * /entrevistadores/{id}:
 *   put:
 *     summary: Atualizar dados do entrevistador
 *     tags: [Entrevistadores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EntrevistadorUpdate'
 *     responses:
 *       200:
 *         description: Entrevistador atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entrevistador'
 *       403:
 *         description: Não autorizado
 *       404:
 *         description: Entrevistador não encontrado
 */

/**
 * @swagger
 * /entrevistadores/{id}:
 *   delete:
 *     summary: Excluir entrevistador
 *     tags: [Entrevistadores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Entrevistador excluído com sucesso
 *       403:
 *         description: Não autorizado
 *       404:
 *         description: Entrevistador não encontrado
 */

router.get('/',
    authorize(permissions.findAll),
    entrevistadorController.findAll.bind(entrevistadorController)
);

router.get('/dashboard',
    authorize(['Entrevistador']),
    entrevistadorController.getDashboard.bind(entrevistadorController)
);

router.get('/usuario',
    authorize(permissions.findByPk),
    entrevistadorController.findByUsuario.bind(entrevistadorController)
);

router.post('/',
    authorize(permissions.create),
    entrevistadorController.create.bind(entrevistadorController)
);

router.get('/:id',
    authorize(permissions.findByPk),
    entrevistadorController.findByPk.bind(entrevistadorController)
);

router.put('/:id',
    authorize(permissions.update),
    entrevistadorController.update.bind(entrevistadorController)
);

router.delete('/:id',
    authorize(permissions.delete),
    entrevistadorController.delete.bind(entrevistadorController)
);

module.exports = router;
