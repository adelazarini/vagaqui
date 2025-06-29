const { Entrevistador } = require('../models');
const { Op } = require('sequelize');
const BaseController = require('./base_controller');

const EntrevistadorService = require('../services/entrevistador_service');

class EntrevistadorController extends BaseController {
    constructor() {
        super(Entrevistador);
    }

    async getDashboard(req, res) {
        try {
            const usuarioId = req.user.id;

            const dadosDashboard = await EntrevistadorService.obterDadosDashboard(usuarioId);

            return res.status(200).json(dadosDashboard);
        } catch (error) {
            console.error('Erro no controller de dashboard do entrevistador:', error);

            if (error.message === 'Entrevistador não encontrado') {
                return res.status(404).json({
                    message: 'Entrevistador não encontrado'
                });
            }

            return res.status(500).json({
                message: 'Erro ao carregar dashboard',
                error: error.message
            });
        }
    }

    async filter(req, res) {
        try {
            const { nome, email, cargo, empresa_id } = req.query;

            const conditions = {};

            if (nome) {
                conditions.nome = { [Op.iLike]: `%${nome}%` };
            }
            if (email) {
                conditions.email = { [Op.iLike]: `%${email}%` };
            }
            if (cargo) {
                conditions.cargo = { [Op.iLike]: `%${cargo}%` };
            }
            if (empresa_id) {
                conditions.empresa_id = empresa_id;
            }

            const entrevistadores = await Entrevistador.findAll({ where: conditions });
            return res.status(200).json(entrevistadores);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao filtrar entrevistadores', error: error.message });
        }
    }
}

module.exports = new EntrevistadorController();
