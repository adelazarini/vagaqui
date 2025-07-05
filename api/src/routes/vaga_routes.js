const express = require('express');
const vagaController = require('../controllers/vaga_controller');
const authorize = require('../middlewares/authorize_middleware');

const authMiddleware = require('../middlewares/auth_middleware');

const router = express.Router();

router.use(authMiddleware);

const permissions = {
    create: ['Empresa', 'Administrador'],
    findAll: ['Candidato', 'Empresa', 'Entrevistador', 'Administrador'],
    findByPk: ['Candidato', 'Empresa', 'Entrevistador', 'Administrador'],
    update: ['Empresa', 'Administrador'],
    delete: ['Empresa', 'Administrador'],
    filterfilter: ['Candidato', 'Empresa', 'Entrevistador', 'Administrador']
};
/**
 * @swagger
 * tags:
 *   name: Vagas
 *   description: Gerenciamento de vagas de emprego
 */

/**
 * @swagger
 * /vagas:
 *   post:
 *     summary: Criar nova vaga
 *     tags: [Vagas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VagaInput'
 *     responses:
 *       201:
 *         description: Vaga criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vaga'
 *       403:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /vagas:
 *   get:
 *     summary: Listar todas as vagas
 *     tags: [Vagas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de vagas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vaga'
 *       403:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /vagas/{id}:
 *   get:
 *     summary: Obter detalhes de uma vaga
 *     tags: [Vagas]
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
 *         description: Detalhes da vaga
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vaga'
 *       404:
 *         description: Vaga não encontrada
 */

/**
 * @swagger
 * /vagas/{id}:
 *   put:
 *     summary: Atualizar dados da vaga
 *     tags: [Vagas]
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
 *             $ref: '#/components/schemas/VagaUpdate'
 *     responses:
 *       200:
 *         description: Vaga atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vaga'
 *       403:
 *         description: Não autorizado
 *       404:
 *         description: Vaga não encontrada
 */

/**
 * @swagger
 * /vagas/{id}:
 *   delete:
 *     summary: Excluir vaga
 *     tags: [Vagas]
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
 *         description: Vaga excluída com sucesso
 *       403:
 *         description: Não autorizado
 *       404:
 *         description: Vaga não encontrada
 */


//CRUD
router.post('/',
    authorize(permissions.create),
    vagaController.create.bind(vagaController)
);

router.get('/',
    authorize(permissions.findAll),
    vagaController.findAll.bind(vagaController)
);

router.get('/:id',
    authorize(permissions.findByPk),
    vagaController.findByPk.bind(vagaController)
);

router.put('/:id',
    authorize(permissions.update),
    vagaController.update.bind(vagaController)
);

router.delete('/:id',
    authorize(permissions.delete),
    vagaController.delete.bind(vagaController)
);

module.exports = router;
