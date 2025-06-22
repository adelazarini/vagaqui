const { Candidato } = require('../models');
const BaseController = require('./base_controller');

class CandidatoController extends BaseController {
    constructor() {
        super(Candidato);
    }

    // Métodos específicos de Candidato podem ser adicionados aqui
    async buscarPorEmail(req, res) {
        try {
            const candidato = await Candidato.findOne({
                where: { email: req.params.email }
            });

            if (!candidato) {
                return res.status(404).json({ message: 'Candidato não encontrado' });
            }

            return res.status(200).json(candidato);
        } catch (error) {
            return res.status(400).json({
                message: 'Erro ao buscar candidato',
                error: error.message
            });
        }
    }
}

module.exports = new CandidatoController();
