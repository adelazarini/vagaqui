const { Vaga } = require('../models');
const { Op } = require('sequelize');
const BaseController = require('./base_controller');

class VagaController extends BaseController {
    constructor() {
        super(Vaga);
    }

    async filter(req, res) {
        try {
            const { titulo, localizacao, salario_min, salario_max, data_publicacao, data_encerramento } = req.query;

            const conditions = {};

            if (titulo) {
                conditions.titulo = { [Op.iLike]: `%${titulo}%` };
            }
            if (localizacao) {
                conditions.localizacao = { [Op.iLike]: `%${localizacao}%` };
            }
            if (salario_min) {
                conditions.salario = { [Op.gte]: salario_min };
            }
            if (salario_max) {
                conditions.salario = { [Op.lte]: salario_max };
            }
            if (data_publicacao) {
                conditions.data_publicacao = { [Op.eq]: data_publicacao };
            }
            if (data_encerramento) {
                conditions.data_encerramento = { [Op.eq]: data_encerramento };
            }

            const vagas = await Vaga.findAll({ where: conditions });
            return res.status(200).json(vagas);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao filtrar vagas', error: error.message });
        }
    }
}

module.exports = new VagaController();
