const { Candidato, Vaga, Candidatura, Curriculo, Entrevista, EntrevistaEntrevistadores, Entrevistador } = require('../models');
const { Op } = require('sequelize');
const entrevista = require('../models/entrevista');

class CandidatoService {
    async obterDadosDashboard(usuarioId) {
        try {
            const candidato = await Candidato.findOne({
                where: { usuario_id: usuarioId },
                include: [
                    {
                        model: Candidatura,
                        as: 'candidaturas',
                        include: [
                            {
                                model: Vaga,
                                as: 'vaga'
                            }
                        ]
                    },
                    {
                        model: Curriculo,
                        as: 'curriculo'
                    }
                ]
            });

            if (!candidato) {
                throw new Error('Candidato não encontrado');
            }

            // Buscar vagas disponíveis
            const vagasDisponiveis = await Vaga.findAll({
                limit: 10,
                order: [['data_publicacao', 'DESC']]
            });

            // Buscar entrevistas pelos IDs das candidaturas
            const candidaturasIds = candidato.candidaturas.map(c => c.id);

            let entrevistas = [];
            let processosSeletivos = [];
            let entrevistasTotais = 0;
            if (candidaturasIds.length > 0) {
                // Buscar entrevistas com os detalhes dos entrevistadores agendados
                processosSeletivos = await Entrevista.findAll({
                    where: {
                        candidatura_id: candidaturasIds
                    },
                });

                // Para cada entrevista, buscar os entrevistadores agendados
                for (const entrevista of processosSeletivos) {
                    const entrevistadores = await EntrevistaEntrevistadores.findAll({
                        where: {
                            entrevista_id: entrevista.id
                        },
                        include: [
                            {
                                model: Entrevistador,
                                as: 'entrevistador'
                            }
                        ]
                    });

                    entrevistasTotais = entrevistasTotais + entrevistadores.length;

                    entrevistas.push({
                        ...entrevista.toJSON(),
                        entrevistadores: entrevistadores,
                        temEntrevistadorAgendado: entrevistadores.length > 0
                    });
                }
            }

            return {
                candidato: {
                    id: candidato.id,
                    nome: candidato.nome,
                    telefone: candidato.telefone,
                    formacao: candidato.formacao,
                    experiencia: candidato.experiencia
                },
                candidaturas: candidato.candidaturas,
                curriculo: candidato.curriculo,
                processosSeletivos: entrevistas,
                vagasDisponiveis,
                estatisticas: {
                    totalCandidaturas: candidato.candidaturas.length,
                    totalProcessoSeletivo: processosSeletivos.length,
                    totalEntrevistasAgendadas: entrevistasTotais,
                    totalAprovacoes: candidato.candidaturas.filter(c => c.status === 'Aprovado').length
                },

            };
        } catch (error) {
            console.error('Erro ao obter dados do dashboard:', error);
            throw error;
        }
    }

    async buscarPorEmail(email) {
        return await Candidato.findOne({ where: { email } });
    }

    async filtrarCandidatos(filtros) {
        const conditions = {};

        if (filtros.nome) {
            conditions.nome = { [Op.iLike]: `%${filtros.nome}%` };
        }
        // Adicionar mais filtros conforme necessário

        return await Candidato.findAll({ where: conditions });
    }

    async uploadCurriculo(usuarioId, arquivoCurriculo) {
        const candidato = await Candidato.findOne({
            where: { usuario_id: usuarioId }
        });

        if (!candidato) {
            throw new Error('Candidato não encontrado');
        }

        const curriculo = await Curriculo.create({
            candidato_id: candidato.id,
            url_documento: arquivoCurriculo.path,
            data_envio: new Date()
        });

        return curriculo;
    }
}

module.exports = new CandidatoService();
