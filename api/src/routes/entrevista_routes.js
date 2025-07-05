const express = require('express');
const entrevistaController = require('../controllers/entrevista_controller');
const authorize = require('../middlewares/authorize_middleware');
const authMiddleware = require('../middlewares/auth_middleware');

const router = express.Router();

router.use(authMiddleware);

const permissions = {
    create: ['Administrador', 'Empresa'],
    findAll: ['Administrador', 'Empresa', 'Entrevistador', 'Candidato'],
    findByPk: ['Administrador', 'Empresa', 'Entrevistador', 'Candidato'],
    update: ['Administrador', 'Empresa', 'Entrevistador'],
    delete: ['Administrador', 'Empresa'],
    filter: ['Administrador', 'Empresa', 'Entrevistador', 'Candidato']
};

/**
 * @swagger
 * tags:
 *   name: Entrevistas
 *   description: Gerenciamento de entrevistas
 */

/**
 * @swagger
 * /entrevistas:
 *   post:
 *     summary: Criar nova entrevista
 *     tags: [Entrevistas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EntrevistaInput'
 *     responses:
 *       201:
 *         description: Entrevista criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entrevista'
 *       403:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /entrevistas:
 *   get:
 *     summary: Listar todas as entrevistas
 *     tags: [Entrevistas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de entrevistas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Entrevista'
 *       403:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /entrevistas/{id}:
 *   get:
 *     summary: Obter detalhes de uma entrevista
 *     tags: [Entrevistas]
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
 *         description: Detalhes da entrevista
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entrevista'
 *       404:
 *         description: Entrevista não encontrada
 */

/**
 * @swagger
 * /entrevistas/{id}:
 *   put:
 *     summary: Atualizar entrevista
 *     tags: [Entrevistas]
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
 *             $ref: '#/components/schemas/EntrevistaUpdate'
 *     responses:
 *       200:
 *         description: Entrevista atualizada com sucesso
 *       404:
 *         description: Entrevista não encontrada
 *       403:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /entrevistas/{id}/entrevistadores:
 *   get:
 *     summary: Listar entrevistadores de uma entrevista
 *     tags: [Entrevistas]
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
 *         description: Lista de entrevistadores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Entrevistador'
 *       404:
 *         description: Entrevista não encontrada
 */

/**
 * @swagger
 * /entrevistas/{id}:
 *   delete:
 *     summary: Excluir entrevista
 *     tags: [Entrevistas]
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
 *         description: Entrevista excluída com sucesso
 *       404:
 *         description: Entrevista não encontrada
 *       403:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /entrevistas/{id}/status:
 *   patch:
 *     summary: Atualizar status da entrevista
 *     tags: [Entrevistas]
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
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: Agendada
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 *       404:
 *         description: Entrevista não encontrada
 *       403:
 *         description: Não autorizado
 */

// CRUD Básico
router.post('/',
    authorize(permissions.create),
    entrevistaController.create.bind(entrevistaController)
);

router.get('/',
    authorize(permissions.findAll),
    entrevistaController.findAll.bind(entrevistaController)
);

router.put('/:id/entrevistador',
    authorize(permissions.update),
    entrevistaController.atualizarEntrevista
);


router.get('/:id',
    authorize(permissions.findByPk),
    entrevistaController.findByPk.bind(entrevistaController)
);

router.put('/:id',
    authorize(permissions.update),
    entrevistaController.update.bind(entrevistaController)
);

router.get('/:id/entrevistadores',
    authorize(['Administrador', 'Empresa', 'Entrevistador']),
    entrevistaController.listarEntrevistadores.bind(entrevistaController)
);

router.delete('/:id/entrevistador/:entrevistadorId',
    authorize(['Administrador', 'Empresa']),
    entrevistaController.removerEntrevistador
);

router.delete('/:id',
    authorize(['Entrevistador', 'Administrador', 'Empresa']),
    entrevistaController.deleteEntrevista
);



router.get('/:id/completa',
    authorize(permissions.findByPk),
    entrevistaController.buscarEntrevistaCompleta.bind(entrevistaController)
);

router.get('/candidatura/:candidaturaId',
    authorize(permissions.findAll),
    entrevistaController.buscarPorCandidatura.bind(entrevistaController)
);

// Atualizar status da entrevista
router.patch('/:id/status',
    authorize(permissions.update),
    entrevistaController.updateStatus.bind(entrevistaController)
);



module.exports = router;
