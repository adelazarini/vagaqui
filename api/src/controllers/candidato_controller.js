const CandidatoService = require('../services/candidato_service');
const BaseController = require('./base_controller');
const Candidato = require('../models/candidato');

class CandidatoController extends BaseController {
    constructor() {
        super(Candidato);
    }

    async buscarPorEmail(req, res) {
        try {
            const { email } = req.params;
            const candidato = await CandidatoService.buscarPorEmail(email);
            return res.status(200).json(candidato);
        } catch (error) {
            return res.status(400).json({
                message: 'Erro ao buscar candidato por email',
                error: error.message
            });
        }
    }

    async getDashboard(req, res) {
        try {
            const usuarioId = req.user.id;

            const dashboardData = await CandidatoService.obterDadosDashboard(usuarioId);

            return res.status(200).json(dashboardData);
        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao carregar dashboard',
                error: error.message
            });
        }
    }

    async uploadCurriculo(req, res) {
        try {

            const usuarioId = req.user.id;

            const curriculo = await CandidatoService.uploadCurriculo(
                usuarioId,
                req.file
            );

            return res.status(201).json(curriculo);
        } catch (error) {
            return res.status(400).json({
                message: 'Erro ao fazer upload do currículo',
                error: error.message
            });
        }
    }
}

module.exports = new CandidatoController();
