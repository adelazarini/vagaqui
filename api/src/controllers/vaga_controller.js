const VagaService = require('../services/vaga_service');
const Vaga = require('../models/vaga');
const BaseController = require('./base_controller');

class VagaController extends BaseController {
    constructor() {
        super(Vaga);
    }
    async filter(req, res) {
        try {
            const vagas = await VagaService.filtrarVagas(req.query);
            return res.status(200).json(vagas);
        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao filtrar vagas',
                error: error.message
            });
        }
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
}

module.exports = new VagaController();
