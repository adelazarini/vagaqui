const MensagemService = require('../services/mensagem_service');

class MensagemController {
    async enviarMensagem(req, res) {
        try {
            const { candidaturaId } = req.params;
            const { usuarioId, usuarioNome, conteudo } = req.body;

            const mensagem = await MensagemService.criarMensagem(
                Number(candidaturaId),
                usuarioId,
                usuarioNome,
                conteudo
            );

            res.status(201).json(mensagem);
        } catch (error) {
            res.status(500).json({
                message: 'Erro ao enviar mensagem',
                error: error.message
            });
        }
    }

    async listarMensagens(req, res) {
        try {
            const { candidaturaId } = req.params;

            const mensagens = await MensagemService.obterMensagensPorCandidatura(
                Number(candidaturaId)
            );

            res.status(200).json(mensagens);
        } catch (error) {
            res.status(500).json({
                message: 'Erro ao listar mensagens',
                error: error.message
            });
        }
    }
}

module.exports = new MensagemController();
