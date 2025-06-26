const { Candidatura, Vaga, Candidato, Curriculo } = require('../models');
const { Op } = require('sequelize');

class CandidaturaService {
    async filtrarCandidaturas(filtros) {
        try {
            const conditions = {};

            if (filtros.vaga_id) {
                conditions.vaga_id = filtros.vaga_id;
            }
            if (filtros.candidato_id) {
                conditions.candidato_id = filtros.candidato_id;
            }
            if (filtros.status) {
                conditions.status = { [Op.iLike]: `%${filtros.status}%` };
            }
            if (filtros.data_candidatura) {
                conditions.data_candidatura = { [Op.eq]: filtros.data_candidatura };
            }

            return await Candidatura.findAll({
                where: conditions,
                include: [
                    { model: Vaga },
                    { model: Candidato }
                ]
            });
        } catch (error) {
            throw new Error(`Erro ao filtrar candidaturas: ${error.message}`);
        }
    }

    async criarCandidatura(dadosCandidatura) {
        try {
            // Validar se a vaga existe
            const vaga = await Vaga.findByPk(dadosCandidatura.vaga_id);
            if (!vaga) {
                throw new Error('Vaga não encontrada');
            }

            // Validar se o candidato existe
            const candidato = await Candidato.findByPk(dadosCandidatura.candidato_id);
            if (!candidato) {
                throw new Error('Candidato não encontrado');
            }

            // Verificar se já existe candidatura para essa vaga e candidato
            const candidaturaExistente = await Candidatura.findOne({
                where: {
                    vaga_id: dadosCandidatura.vaga_id,
                    candidato_id: dadosCandidatura.candidato_id
                }
            });

            if (candidaturaExistente) {
                throw new Error('Candidatura já existe para esta vaga');
            }

            // Criar candidatura
            return await Candidatura.create({
                ...dadosCandidatura,
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
}

module.exports = new CandidaturaService();
