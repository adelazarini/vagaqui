const CandidaturaService = require('../services/candidatura_service');
const BaseController = require('./base_controller');
const Candidatura = require('../models/candidatura');
const EntrevistaService = require('../services/entrevista_service');

class CandidaturaController extends BaseController {
    constructor() {
        super(Candidatura);
    }

    async buscarCandidaturasDoCandidato(req, res) {
        try {

            const usuarioId = req.user.id;

            const resultado = await CandidaturaService.buscarCandidaturasDoCandidato(usuarioId);

            return res.status(200).json(resultado);

        } catch (error) {
            console.error('Erro ao buscar candidaturas:', error);
            return res.status(500).json({
                message: 'Erro ao buscar candidaturas',
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
            const usuarioId = req.user.id;

            const vagaId = req.params.id;

            const novaCandidatura = await CandidaturaService.criarCandidatura(vagaId, usuarioId);

            return res.status(201).json(novaCandidatura);
        } catch (error) {
            return res.status(400).json({
                message: 'Erro ao criar candidatura',
                error: error.message
            });
        }
    }

    async adicionarEntrevistador(req, res) {
        try {
            const { id } = req.params;
            const usuarioId = req.user.id;
            const { id_entrevistador } = req.params;


            const novasAssociacoes = await EntrevistaService.vincularEntrevistadores(
                id,
                id_entrevistador,
                usuarioId
            );

            return res.status(201).json(novasAssociacoes);
        } catch (error) {
            console.error('Erro ao adicionar entrevistadores:', error);
            return res.status(400).json({
                message: 'Erro ao adicionar entrevistadores',
                error: error.message
            });
        }
    }
}

module.exports = new CandidaturaController();
