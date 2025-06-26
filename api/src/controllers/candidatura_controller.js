const CandidaturaService = require('../services/candidatura_service');
const BaseController = require('./base_controller');
const Candidatura = require('../models/candidatura');

class CandidaturaController extends BaseController {
    constructor() {
        super(Candidatura);
    }

    async filter(req, res) {
        try {
            const candidaturas = await CandidaturaService.filtrarCandidaturas(req.query);
            return res.status(200).json(candidaturas);
        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao filtrar candidaturas',
                error: error.message
            });
        }
    }

    async buscarPorVagaId(req, res) {
        try {
            const { vaga_id } = req.params;
            const candidaturas = await CandidaturaService.buscarCandidaturasPorVaga(vaga_id);
            return res.status(200).json(candidaturas);
        } catch (error) {
            return res.status(400).json({
                message: 'Erro ao buscar candidaturas por vaga',
                error: error.message
            });
        }
    }

    async atualizarStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const candidaturaAtualizada = await CandidaturaService.atualizarStatusCandidatura(id, status);

            return res.status(200).json(candidaturaAtualizada);
        } catch (error) {
            return res.status(400).json({
                message: 'Erro ao atualizar status da candidatura',
                error: error.message
            });
        }
    }

    async create(req, res) {
        try {
            // Obter ID do usuário logado
            const usuarioId = req.user.id;

            // Adicionar usuário aos dados da candidatura
            const dadosCandidatura = {
                ...req.body,
                candidatoId: usuarioId
            };

            const novaCandidatura = await CandidaturaService.criarCandidatura(dadosCandidatura);

            return res.status(201).json(novaCandidatura);
        } catch (error) {
            return res.status(400).json({
                message: 'Erro ao criar candidatura',
                error: error.message
            });
        }
    }
}

module.exports = new CandidaturaController();
