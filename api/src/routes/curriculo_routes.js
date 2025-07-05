const curriculoController = require('../controllers/curriculo_controller');
const baseRouter = require('./base_routes');

const router = baseRouter(curriculoController);

/**
 * @swagger
 * tags:
 *   name: Currículos
 *   description: Gerenciamento de currículos dos candidatos
 */

/**
 * @swagger
 * /curriculos/candidato/{candidato_id}:
 *   get:
 *     summary: Obter currículo por ID do candidato
 *     tags: [Currículos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: candidato_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do candidato
 *     responses:
 *       200:
 *         description: Currículo do candidato
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curriculo'
 *       404:
 *         description: Currículo não encontrado
 */

router.get('/candidato/:candidato_id', curriculoController.buscarPorCandidatoId.bind(curriculoController));

module.exports = router;
