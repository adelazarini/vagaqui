const MensagemService = require('../services/mensagem_service');

class MensagemController {
    async enviarMensagem(req, res) {
        try {
            const { candidaturaId } = req.params;
            const { conteudo } = req.body;

            const usuarioId = req.user.id;
            const usuarioNome = req.user.nome;

            const conversa = await MensagemService.criarMensagem(
                candidaturaId,
                usuarioId,
                usuarioNome,
                conteudo
            );

            res.status(201).json(conversa);
        } catch (error) {
            res.status(500).json({
                message: 'Erro ao criar mensagem',
                error: error.message
            });
        }
    }

    async listarMensagensPorCandidatura(req, res) {
        try {
            const { candidaturaId } = req.params;

            const mensagens = await MensagemService.obterMensagensPorCandidatura(candidaturaId);

            res.status(200).json(mensagens);
        } catch (error) {
            res.status(500).json({
                message: 'Erro ao buscar mensagens',
                error: error.message
            });
        }
    }

    async obterMensagensPorUsuario(req, res) {
        try {
            const usuarioId = req.user.id;

            const mensagens = await MensagemService.obterMensagensPorUsuario(usuarioId);

            res.json(mensagens);
        } catch (error) {
            res.status(500).json({
                message: 'Erro ao buscar mensagens do usuário',
                error: error.message
            });
        }
    }

    async obterCandidaturasComMensagens(req, res) {
        try {
            const { usuarioId } = req.params;

            const candidaturas = await MensagemService.obterCandidaturasComMensagens(usuarioId);

            res.json(candidaturas);
        } catch (error) {
            res.status(500).json({
                message: 'Erro ao buscar candidaturas',
                error: error.message
            });
        }
    }
}

module.exports = new MensagemController();
