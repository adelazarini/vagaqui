const VagaService = require('../services/vaga_service');
const Vaga = require('../models/vaga');
const BaseController = require('./base_controller');

class VagaController extends BaseController {
    constructor() {
        super(Vaga);
    }
    async create(req, res) {
        try {
            const usuarioId = req.user.id;
            const novaVaga = await VagaService.criarVaga(usuarioId, req.body);

            res.status(201).json({
                message: 'Vaga criada com sucesso',
                vaga: novaVaga
            });
        } catch (error) {
            console.error('Erro ao criar vaga:', error);
            res.status(500).json({
                error: 'Erro interno do servidor',
                detalhes: error.message
            });
        }
    }

    async update(req, res) {
        try {
            const id = req.params;
            const dadosAtualizados = req.body;

            const [updated] = await Vaga.update(dadosAtualizados, {
                where: id
            });

            if (!updated) {
                return res.status(404).json({ message: 'Vaga não encontrada' });
            }

            const vagaAtualizada = await Vaga.findByPk(id);
            return res.status(200).json(vagaAtualizada);
        } catch (error) {
            return res.status(400).json({
                message: 'Erro ao atualizar vaga',
                error: error.message
            });
        }
    }

    async listar(req, res) {
        try {
            const usuarioId = req.user.id;
            const vagas = await VagaService.listarVagasEmpresa(usuarioId);

            res.json(vagas);
        } catch (error) {
            console.error('Erro ao listar vagas:', error);
            res.status(500).json({
                error: 'Erro interno do servidor',
                detalhes: error.message
            });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;

            const usuarioId = req.user.id;
            const dadosAtualizados = req.body;

            const vagaAtualizada = await VagaService.atualizarVaga(id, dadosAtualizados, usuarioId);

            return res.status(200).json(vagaAtualizada);
        } catch (error) {
            return res.status(400).json({
                message: 'Erro ao atualizar vaga',
                error: error.message
            });
        }
    }
}

module.exports = new VagaController();
