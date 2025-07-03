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

            const dados = await EntrevistadorService.obterDadosDashboard(usuarioId);

            return res.status(200).json(dados);
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


}

module.exports = new EntrevistadorController();
