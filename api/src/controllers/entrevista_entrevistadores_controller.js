// src/controllers/entrevistaEntrevistadoresController.js
const EntrevistaEntrevistadoresService = require('../services/entrevista_entrevistadores_service');
const BaseController = require('./base_controller');

class EntrevistaEntrevistadoresController extends BaseController {
    constructor() {
        super(Entrevista_Entrevistadores);
    }

    async criarEntrevistaEntrevistador(req, res) {
        try {
            const dadosEntrevista = {
                ...req.body,
                entrevistador_id: req.user.id // Obtém ID do entrevistador logado
            };

            const novaEntrevistaEntrevistador = await EntrevistaEntrevistadoresService.criarEntrevistaEntrevistador(
                dadosEntrevista
            );

            return res.status(201).json(novaEntrevistaEntrevistador);
        } catch (error) {
            console.error('Erro ao criar entrevista-entrevistador:', error);
            return res.status(400).json({
                message: 'Erro ao criar entrevista-entrevistador',
                error: error.message
            });
        }
    }

    async buscarEntrevistasDoEntrevistador(req, res) {
        try {
            const entrevistadorId = req.user.id;

            const entrevistas = await EntrevistaEntrevistadoresService.buscarEntrevistasDoEntrevistador(
                entrevistadorId
            );

            return res.status(200).json(entrevistas);
        } catch (error) {
            console.error('Erro ao buscar entrevistas:', error);
            return res.status(400).json({
                message: 'Erro ao buscar entrevistas',
                error: error.message
            });
        }
    }

    async atualizarEntrevistaEntrevistador(req, res) {
        try {
            const { id } = req.params;
            const dadosAtualizacao = req.body;

            const entrevistaAtualizada = await EntrevistaEntrevistadoresService.atualizarEntrevistaEntrevistador(
                id,
                dadosAtualizacao
            );

            return res.status(200).json(entrevistaAtualizada);
        } catch (error) {
            console.error('Erro ao atualizar entrevista-entrevistador:', error);
            return res.status(400).json({
                message: 'Erro ao atualizar entrevista-entrevistador',
                error: error.message
            });
        }
    }
}

module.exports = new EntrevistaEntrevistadoresController();
