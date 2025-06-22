const { Candidatura, Vaga } = require('../models');
const { Op } = require('sequelize');
const BaseController = require('./base_controller');

class CandidaturaController extends BaseController {
    constructor() {
        super(Candidatura);
    }

    async filter(req, res) {
        try {
            const { vaga_id, candidato_id, status, data_candidatura } = req.query;

            const conditions = {};

            if (vaga_id) {
                conditions.vaga_id = vaga_id;
            }
            if (candidato_id) {
                conditions.candidato_id = candidato_id;
            }
            if (status) {
                conditions.status = { [Op.iLike]: `%${status}%` };
            }
            if (data_candidatura) {
                conditions.data_candidatura = { [Op.eq]: data_candidatura };
            }

            const candidaturas = await Candidatura.findAll({ where: conditions });
            return res.status(200).json(candidaturas);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao filtrar candidaturas', error: error.message });
        }
    }
    async buscarPorVagaId(req, res) {
        try {
            const vaga = await Vaga.findOne({
                where: { vaga_id: req.params.vaga_id }
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

module.exports = new CandidaturaController();
