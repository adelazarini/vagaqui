const { Candidatura, Vaga, Candidato } = require('../models');
const { Op } = require('sequelize');

class CandidaturaService {

    async criarCandidatura(vagaId, usuarioId) {
        try {
            // Validar se a vaga existe
            const vaga = await Vaga.findByPk(vagaId);
            if (!vaga) {
                throw new Error('Vaga não encontrada');
            }

            // Validar se o candidato existe por usuário_id
            const candidato = await Candidato.findOne({
                where: { usuario_id: usuarioId }
            });

            if (!candidato) {
                throw new Error('Candidato não encontrado');
            }

            // Verificar se já existe candidatura para essa vaga e candidato
            const candidaturaExistente = await Candidatura.findOne({
                where: {
                    vaga_id: vagaId,
                    candidato_id: candidato.id
                }
            });

            if (candidaturaExistente) {
                throw new Error('Candidatura já existe para esta vaga');
            }

            // Criar candidatura
            return await Candidatura.create({
                vaga_id: vagaId,
                candidato_id: candidato.id,
                data_candidatura: new Date(),
                status: 'Em Análise'
            });
        } catch (error) {
            throw new Error(`Erro ao criar candidatura: ${error.message}`);
        }
    }

    async buscarCandidaturasPorVaga(vagaId) {
        try {
            return await Candidatura.findAll({
                where: { vaga_id: vagaId },
                include: [
                    { model: Candidato }
                ]
            });
        } catch (error) {
            throw new Error(`Erro ao buscar candidaturas da vaga: ${error.message}`);
        }
    }

    async atualizarStatusCandidatura(candidaturaId, novoStatus) {
        try {
            const candidatura = await Candidatura.findByPk(candidaturaId);

            if (!candidatura) {
                throw new Error('Candidatura não encontrada');
            }

            return await candidatura.update({
                status: novoStatus,
                data_atualizacao: new Date()
            });
        } catch (error) {
            throw new Error(`Erro ao atualizar status da candidatura: ${error.message}`);
        }
    }

    async buscarCandidaturasDoCandidato(usuarioId) {
        // Validar se o candidato existe por usuario_id
        const candidato = await Candidato.findOne({
            where: { usuario_id: usuarioId }
        });
        if (!candidato) {
            throw new Error('Candidato não encontrado');
        }
        try {
            return await Candidatura.findAll({
                where: { candidato_id: candidato.id }
            });
        } catch (error) {
            throw new Error(`Erro ao buscar candidaturas do candidato: ${error.message}`);
        }
    }
}
module.exports = new CandidaturaService();
