const express = require('express');
const EmpresaController = require('../controllers/empresa_controller');
const authorize = require('../middlewares/authorize_middleware');
const authMiddleware = require('../middlewares/auth_middleware');

const router = express.Router();
router.use(authMiddleware);

const permissions = {
    create: ['Administrador'],
    findAll: ['Empresa', 'Entrevistador', 'Administrador'],
    findByPk: ['Entrevistador', 'Empresa', 'Administrador'],
    update: ['Empresa', 'Administrador'],
    delete: ['Administrador']
};

/**
 * @swagger
 * tags:
 *   name: Empresas
 *   description: Gerenciamento de empresas
 */

/**
 * @swagger
 * /empresas/dashboard:
 *   get:
 *     summary: Obter dados do dashboard da empresa
 *     tags: [Empresas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do dashboard da empresa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalVagas:
 *                   type: integer
 *                   example: 10
 *                 totalCandidaturas:
 *                   type: integer
 *                   example: 50
 *                 totalEntrevistas:
 *                   type: integer
 *                   example: 5
 *       401:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /empresas/email/{email}:
 *   get:
 *     summary: Buscar empresa por email
 *     tags: [Empresas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email da empresa
 *     responses:
 *       200:
 *         description: Dados da empresa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empresa'
 *       404:
 *         description: Empresa não encontrada
 */

/**
 * @swagger
 * /empresas/cnpj/{cnpj}:
 *   get:
 *     summary: Buscar empresa por CNPJ
 *     tags: [Empresas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cnpj
 *         required: true
 *         schema:
 *           type: string
 *         description: CNPJ da empresa
 *     responses:
 *       200:
 *         description: Dados da empresa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empresa'
 *       404:
 *         description: Empresa não encontrada
 */

/**
 * @swagger
 * /empresas:
 *   post:
 *     summary: Criar nova empresa
 *     tags: [Empresas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmpresaInput'
 *     responses:
 *       201:
 *         description: Empresa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empresa'
 *       400:
 *         description: Dados inválidos
 *       403:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /empresas/{id}:
 *   get:
 *     summary: Obter detalhes da empresa
 *     tags: [Empresas]
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
 *         description: Detalhes da empresa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empresa'
 *       404:
 *         description: Empresa não encontrada
 */

/**
 * @swagger
 * /empresas/{id}:
 *   put:
 *     summary: Atualizar dados da empresa
 *     tags: [Empresas]
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
 *             $ref: '#/components/schemas/EmpresaUpdate'
 *     responses:
 *       200:
 *         description: Empresa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empresa'
 *       400:
 *         description: Dados inválidos
 *       403:
 *         description: Não autorizado
 *       404:
 *         description: Empresa não encontrada
 */

/**
 * @swagger
 * /empresas/{id}:
 *   delete:
 *     summary: Excluir empresa
 *     tags: [Empresas]
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
 *         description: Empresa excluída com sucesso
 *       403:
 *         description: Não autorizado
 *       404:
 *         description: Empresa não encontrada
 */

router.get('/dashboard',
    authorize(['Empresa']),
    EmpresaController.obterDadosDashboard
);

router.get('/email/:email',
    authorize(permissions.findByPk),
    EmpresaController.buscarPorEmail
);

router.get('/cnpj/:cnpj',
    authorize(permissions.findByPk),
    EmpresaController.buscarPorCnpj
);

router.post('/',
    authorize(permissions.create),
    EmpresaController.create.bind(EmpresaController)
);

router.get('/:id',
    authorize(permissions.findByPk),
    EmpresaController.findByPk.bind(EmpresaController)
);

router.put('/:id',
    authorize(permissions.update),
    EmpresaController.update.bind(EmpresaController)
);

router.delete('/:id',
    authorize(permissions.delete),
    EmpresaController.delete.bind(EmpresaController)
);

module.exports = router;
