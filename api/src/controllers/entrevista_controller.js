const EntrevistaService = require('../services/entrevista_service');
const BaseController = require('./base_controller');
const { Entrevista } = require('../models');
const EntrevistaEntrevistadoresService = require('../services/entrevista_entrevistadores_service');

class EntrevistaController extends BaseController {
    constructor() {
        super(Entrevista);
    }

    async create(req, res) {
        try {
            const usuarioId = req.user.id;
            const novaEntrevista = await EntrevistaService.criarEntrevista(req.body, usuarioId);
            return res.status(201).json(novaEntrevista);
        } catch (error) {
            console.error('Erro ao criar entrevista:', error);
            return res.status(400).json({
                message: 'Erro ao criar entrevista',
                error: error.message
            });
        }
    }

    async findAll(req, res) {
        return super.findAll(req, res);
    }

    async findByPk(req, res) {
        try {
            const usuarioId = req.user.id;
            const tipoUsuario = req.user.tipo_usuario;
            const entrevista = await EntrevistaService.buscarEntrevistaCompleta(
                req.params.id,
                usuarioId,
                tipoUsuario
            );
            return res.status(200).json(entrevista);
        } catch (error) {
            console.error('Erro ao buscar entrevista:', error);
            return res.status(404).json({
                message: 'Erro ao buscar entrevista',
                error: error.message
            });
        }
    }

    async update(req, res) {
        return super.update(req, res);
    }

    async deleteEntrevista(req, res) {
        try {
            const { id } = req.params; //id entrevista
            const userId = req.user.id; // ID do usuario logado

            const entrevistaAtualizada = await EntrevistaEntrevistadoresService.ExcluiEntrevistaEntrevistador(
                Number(id),
                userId
            );

            return res.status(200).json(entrevistaAtualizada);
        } catch (error) {
            console.error('Erro ao atualizar entrevista:', error);
            return res.status(500).json({
                message: 'Erro interno do servidor',
                error: error.message
            });
        }
    }

    async updateStatus(req, res) {
        try {
            const usuarioId = req.user.id;
            const { novoStatus } = req.body;
            const entrevista = await EntrevistaService.atualizarStatusEntrevista(
                req.params.id,
                novoStatus,
                usuarioId
            );
            return res.status(200).json(entrevista);
        } catch (error) {
            console.error('Erro ao atualizar status da entrevista:', error);
            return res.status(400).json({
                message: 'Erro ao atualizar status da entrevista',
                error: error.message
            });
        }
    }

    async listarEntrevistadores(req, res) {
        try {
            const { id } = req.params;
            const usuarioId = req.user.id;
            const tipoUsuario = req.user.tipo_usuario;

            const entrevistadores = await EntrevistaService.buscarEntrevistadoresDaEntrevista(
                id,
                usuarioId,
                tipoUsuario
            );

            return res.status(200).json(entrevistadores);
        } catch (error) {
            console.error('Erro ao listar entrevistadores:', error);
            return res.status(404).json({
                message: 'Erro ao listar entrevistadores',
                error: error.message
            });
        }
    }

    async removerEntrevistador(req, res) {
        try {
            const { id, entrevistadorId } = req.params;
            const usuarioId = req.user.id;

            await EntrevistaService.removerEntrevistadorDaEntrevista(
                id,
                entrevistadorId,
                usuarioId
            );

            return res.status(204).send();
        } catch (error) {
            console.error('Erro ao remover entrevistador:', error);
            return res.status(400).json({
                message: 'Erro ao remover entrevistador',
                error: error.message
            });
        }
    }

    async buscarEntrevistaCompleta(req, res) {
        return this.findByPk(req, res);
    }

    async buscarPorCandidatura(req, res) {
        try {
            const { candidaturaId } = req.params;
            const usuarioId = req.user.id;
            const tipoUsuario = req.user.tipo_usuario;

            const entrevistas = await EntrevistaService.buscarEntrevistasPorCandidatura(
                candidaturaId,
                usuarioId,
                tipoUsuario
            );

            return res.status(200).json(entrevistas);
        } catch (error) {
            console.error('Erro ao buscar entrevistas da candidatura:', error);
            return res.status(404).json({
                message: 'Erro ao buscar entrevistas da candidatura',
                error: error.message
            });
        }
    }

    async atualizarEntrevista(req, res) {
        try {
            const { id } = req.params; // ID da entrevista 
            const dadosEntrevista = req.body;
            const userId = req.user.id; // ID do usuario logado

            const entrevistaAtualizada = await EntrevistaEntrevistadoresService.atualizarEntrevista(
                Number(id),
                dadosEntrevista,
                userId
            );

            return res.status(200).json(entrevistaAtualizada);
        } catch (error) {
            console.error('Erro ao atualizar entrevista:', error);
            return res.status(500).json({
                message: 'Erro interno do servidor',
                error: error.message
            });
        }
    }
}

module.exports = new EntrevistaController();
