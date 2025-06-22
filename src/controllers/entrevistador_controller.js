const { Entrevistador } = require('../models');
const BaseController = require('./base_controller');

class EntrevistadorController extends BaseController {
    constructor() {
        super(Entrevistador);
    }

    async buscarPorEmail(req, res) {
        try {
            const entrevistador = await Entrevistador.findOne({
                where: { email: req.params.email }
            });

            if (!entrevistador) {
                return res.status(404).json({ message: 'Entrevistador não encontrado' });
            }

            return res.status(200).json(entrevistador);
        } catch (error) {
            return res.status(400).json({
                message: 'Erro ao buscar entrevistador',
                error: error.message
            });
        }
    }
}

module.exports = new EntrevistadorController();
