const { Entrevista } = require('../models');
const { Op } = require('sequelize');
const BaseController = require('./base_controller');

class EntrevistaController extends BaseController {
    constructor() {
        super(Entrevista);
    }

    async filter(req, res) {
        try {
            const { candidatura_id, entrevistador_id, data_entrevista, hora_entrevista } = req.query;

            const conditions = {};

            if (candidatura_id) {
                conditions.candidatura_id = candidatura_id;
            }
            if (entrevistador_id) {
                conditions.entrevistador_id = entrevistador_id;
            }
            if (data_entrevista) {
                conditions.data_entrevista = { [Op.eq]: data_entrevista };
            }
            if (hora_entrevista) {
                conditions.hora_entrevista = { [Op.eq]: hora_entrevista };
            }

            const entrevistas = await Entrevista.findAll({ where: conditions });
            return res.status(200).json(entrevistas);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao filtrar entrevistas', error: error.message });
        }
    }
}

module.exports = new EntrevistaController();
