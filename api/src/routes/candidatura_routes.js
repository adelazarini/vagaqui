const express = require('express');
const candidaturaController = require('../controllers/candidatura_controller');
const authorize = require('../middlewares/authorize_middleware');

const router = express.Router();

const permissions = {
    create: ['Candidato'],
    findAll: ['Empresa', 'Entrevistador', 'Administrador', 'Candidato'],
    findByPk: ['Candidato', 'Empresa', 'Entrevistador', 'Administrador', 'Usuario'],
    update: ['Empresa', 'Entrevistador'],
    delete: ['Empresa', 'Administrador', 'Candidato'],
};

/**
 * @swagger
 * tags:
 *   name: Candidaturas
 *   description: Gerenciamento de candidaturas
 */

/**
 * @swagger
 * /candidaturas:
 *   get:
 *     summary: Listar candidaturas do usuário logado
 *     tags: [Candidaturas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de candidaturas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Candidatura'
 *       401:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /candidaturas/{id}:
 *   get:
 *     summary: Obter detalhes de uma candidatura
 *     tags: [Candidaturas]
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
 *         description: Detalhes da candidatura
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidatura'
 *       404:
 *         description: Candidatura não encontrada
 */

/**
 * @swagger
 * /candidaturas/{id}/entrevistador/{id_entrevistador}:
 *   post:
 *     summary: Adicionar entrevistador à candidatura
 *     tags: [Candidaturas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id_entrevistador
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Entrevistador adicionado com sucesso
 *       404:
 *         description: Candidatura ou entrevistador não encontrado
 *       403:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /candidaturas/{id}:
 *   post:
 *     summary: Criar nova candidatura
 *     tags: [Candidaturas]
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
 *             $ref: '#/components/schemas/CandidaturaInput'
 *     responses:
 *       201:
 *         description: Candidatura criada com sucesso
 *       400:
 *         description: Dados inválidos ou candidatura já existente
 *       403:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /candidaturas/{id}:
 *   put:
 *     summary: Atualizar candidatura
 *     tags: [Candidaturas]
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
 *             $ref: '#/components/schemas/CandidaturaUpdate'
 *     responses:
 *       200:
 *         description: Candidatura atualizada com sucesso
 *       400:
 *         description: Dados inválidos
 *       403:
 *         description: Não autorizado
 *       404:
 *         description: Candidatura não encontrada
 */

/**
 * @swagger
 * /candidaturas/{id}:
 *   delete:
 *     summary: Excluir candidatura
 *     tags: [Candidaturas]
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
 *         description: Candidatura excluída com sucesso
 *       403:
 *         description: Não autorizado
 *       404:
 *         description: Candidatura não encontrada
 */

/**
 * @swagger
 * /candidaturas/vaga/{vaga_id}:
 *   get:
 *     summary: Listar candidaturas por vaga
 *     tags: [Candidaturas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: vaga_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de candidaturas para a vaga
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Candidatura'
 *       401:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /candidaturas/{id}/status:
 *   patch:
 *     summary: Atualizar status da candidatura
 *     tags: [Candidaturas]
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
 *                 example: aprovado
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       403:
 *         description: Não autorizado
 *       404:
 *         description: Candidatura não encontrada
 */

//Busca todas as candidaturas do candidato logado
router.get('/',
    authorize(permissions.findAll),
    candidaturaController.buscarCandidaturasDoCandidato.bind(candidaturaController)
);

// Busca uma candidatura por ID
router.get('/:id',
    authorize(permissions.findByPk),
    candidaturaController.findByPk.bind(candidaturaController)
);

//suepr usado
router.post('/:id/entrevistador/:id_entrevistador',
    authorize(['Administrador', 'Empresa']),
    candidaturaController.adicionarEntrevistador
);

router.post('/:id',
    authorize(permissions.create),
    candidaturaController.create.bind(candidaturaController)
);


router.put('/:id',
    authorize(permissions.update),
    candidaturaController.update.bind(candidaturaController)
);


router.delete('/:id',
    authorize(permissions.delete),
    candidaturaController.delete.bind(candidaturaController)
);

router.get('/vaga/:vaga_id',
    authorize(permissions.findAll),
    candidaturaController.buscarPorVagaId.bind(candidaturaController)
);

router.patch('/:id/status',
    authorize(permissions.update),
    candidaturaController.atualizarStatus.bind(candidaturaController)
);

module.exports = router;
