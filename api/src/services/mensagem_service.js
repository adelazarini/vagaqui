const Mensagem = require('../models/mensagem');

class MensagemService {
    async criarMensagem(candidaturaId, usuarioId, usuarioNome, conteudo) {
        try {
            // Buscar conversa existente ou criar nova
            let conversa = await Mensagem.findOne({ candidaturaId });

            if (!conversa) {
                conversa = new Mensagem({
                    candidaturaId,
                    mensagens: [],
                    participantes: [usuarioId]
                });
            }

            // Adicionar nova mensagem
            conversa.mensagens.push({
                usuarioId,
                usuarioNome,
                conteudo,
                timestamp: new Date()
            });

            // Adicionar participante se não existir
            if (!conversa.participantes.includes(usuarioId)) {
                conversa.participantes.push(usuarioId);
            }

            await conversa.save();
            return conversa;
        } catch (error) {
            console.error('Erro ao criar mensagem:', error);
            throw error;
        }
    }

    async obterMensagensPorCandidatura(candidaturaId) {
        try {
            const conversa = await Mensagem.findOne({ candidaturaId });
            return conversa ? conversa.mensagens : [];
        } catch (error) {
            console.error('Erro ao buscar mensagens:', error);
            throw error;
        }
    }

    async adicionarParticipante(candidaturaId, usuarioId) {
        try {
            const conversa = await Mensagem.findOne({ candidaturaId });

            if (!conversa) {
                throw new Error('Conversa não encontrada');
            }

            if (!conversa.participantes.includes(usuarioId)) {
                conversa.participantes.push(usuarioId);
                await conversa.save();
            }

            return conversa;
        } catch (error) {
            console.error('Erro ao adicionar participante:', error);
            throw error;
        }
    }
}

module.exports = new MensagemService();
