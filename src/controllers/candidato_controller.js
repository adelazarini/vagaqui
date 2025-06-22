const { Candidato } = require('../models');
const { Op } = require('sequelize');
const BaseController = require('./base_controller');

class CandidatoController extends BaseController {
    constructor() {
        super(Candidato);
    }

    async filter(req, res) {
        try {
            const { nome, email, cpf, telefone, formacao } = req.query;

            const conditions = {};

            if (nome) {
                conditions.nome = { [Op.iLike]: `%${nome}%` };
            }
            if (email) {
                conditions.email = { [Op.iLike]: `%${email}%` };
            }
            if (cpf) {
                conditions.cpf = { [Op.eq]: cpf };
            }
            if (telefone) {
                conditions.telefone = { [Op.iLike]: `%${telefone}%` };
            }
            if (formacao) {
                conditions.formacao = { [Op.iLike]: `%${formacao}%` };
            }

            const candidatos = await Candidato.findAll({ where: conditions });
            return res.status(200).json(candidatos);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao filtrar candidatos', error: error.message });
        }
    }

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
