const { Curriculo } = require('../models');
const BaseController = require('./base_controller');

class CurriculoController extends BaseController {
    constructor() {
        super(Curriculo);
    }

    async buscarPorCandidatoId(req, res) {
        try {
            const curriculo = await Curriculo.findOne({
                where: { candidato_id: req.params.candidato_id }
            });

            if (!curriculo) {
                return res.status(404).json({ message: 'Currículo não encontrado' });
            }

            return res.status(200).json(curriculo);
        } catch (error) {
            return res.status(400).json({
                message: 'Erro ao buscar currículo',
                error: error.message
            });
        }
    }
}

module.exports = new CurriculoController();
