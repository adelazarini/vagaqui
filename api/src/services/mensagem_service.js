const Mensagem = require('../models/mensagem');
const { Candidatura, Vaga, Usuario, Candidato } = require('../models');
const { Op } = require('sequelize');

class MensagemService {
    async criarMensagem(candidaturaId, usuarioId, usuarioNome, conteudo) {
        try {

            // Buscar conversa existente ou criar nova
            let conversa = await Mensagem.findOne({ candidaturaId });

            if (!conversa) {

                const candidatura = await Candidatura.findByPk(candidaturaId);

                const candidato = await Candidato.findOne({
                    where: {
                        id: candidatura.candidato_id
                    }
                })

                const usuarioCandidato = await Usuario.findOne({
                    where: {
                        id: candidato.usuario_id
                    }
                })

                const participantes = [
                    usuarioCandidato.id
                ];

                conversa = new Mensagem({
                    candidaturaId,
                    mensagens: [],
                    participantes
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

    async obterMensagensPorUsuario(usuarioId) {
        try {
            // Buscar mensagens onde o usuário está nos participantes
            const mensagens = await Mensagem.find({
                participantes: usuarioId
            });

            // Processar mensagens agrupadas por candidatura
            const mensagensPorCandidatura = {};

            mensagens.forEach(conversa => {
                conversa.mensagens.forEach(msg => {
                    const msgProcessada = {
                        ...msg.toObject(),
                        candidaturaId: conversa.candidaturaId
                    };

                    if (!mensagensPorCandidatura[conversa.candidaturaId]) {
                        mensagensPorCandidatura[conversa.candidaturaId] = [];
                    }

                    mensagensPorCandidatura[conversa.candidaturaId].push(msgProcessada);
                });
            });

            // Ordenar mensagens de cada candidatura por timestamp
            Object.keys(mensagensPorCandidatura).forEach(candidaturaId => {
                mensagensPorCandidatura[candidaturaId].sort((a, b) =>
                    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
                );
            });

            // Transformar em array e ordenar candidaturas pela última mensagem
            const resultado = Object.entries(mensagensPorCandidatura)
                .map(([candidaturaId, msgs]) => ({
                    candidaturaId: Number(candidaturaId),
                    mensagens: msgs,
                    ultimaMensagem: msgs[msgs.length - 1]
                }))
                .sort((a, b) =>
                    new Date(b.ultimaMensagem.timestamp).getTime() -
                    new Date(a.ultimaMensagem.timestamp).getTime()
                );

            return resultado;
        } catch (error) {
            console.error('Erro ao buscar mensagens do usuário:', error);
            throw error;
        }
    }

    async obterCandidaturasComMensagens(usuarioId) {
        try {
            // Buscar candidaturas do usuário
            const candidaturas = await Candidatura.findAll({
                where: {
                    [Op.or]: [
                        { candidato_id: usuarioId },
                        { '$vaga.empresa_id$': usuarioId }
                    ]
                },
                include: [{ model: Vaga, as: 'vaga' }]
            });

            // Obter IDs das candidaturas
            const candidaturasIds = candidaturas.map(c => c.id);

            // Buscar mensagens para essas candidaturas
            const mensagens = await Mensagem.find({
                candidaturaId: { $in: candidaturasIds }
            });

            // Processar candidaturas com mensagens
            const candidaturasComMensagens = candidaturas.map(candidatura => {
                const conversas = mensagens.filter(m => m.candidaturaId === candidatura.id);
                const ultimaMensagem = conversas.length > 0
                    ? conversas[0].mensagens.sort((a, b) =>
                        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
                    )[0]
                    : null;

                return {
                    id: candidatura.id,
                    vaga: candidatura.vaga,
                    temMensagens: conversas.length > 0,
                    ultimaMensagem
                };
            });

            return candidaturasComMensagens;
        } catch (error) {
            console.error('Erro ao buscar candidaturas com mensagens:', error);
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
