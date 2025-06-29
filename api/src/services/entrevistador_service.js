const { Op } = require('sequelize');

const { Candidato, Vaga, Candidatura, Entrevista, Entrevistador, EntrevistaEntrevistadores } = require('../models');

class EntrevistadorService {
    async obterDadosDashboard(usuarioId) {
        try {
            const entrevistador = await Entrevistador.findOne({
                attributes: ['id', 'nome', 'cargo'],
                where: { usuario_id: usuarioId },
            });

            if (!entrevistador) {
                throw new Error('Entrevistador não encontrado');
            }

            // Buscar entrevistas do entrevistador
            const entrevistasEntrevistador = await EntrevistaEntrevistadores.findAll({
                where: { entrevistador_id: entrevistador.id },
                include: [
                    {
                        model: Entrevista,
                        as: 'entrevista',
                        include: [
                            {
                                model: Candidatura,
                                as: 'candidatura',
                                include: [
                                    {
                                        model: Vaga,
                                        as: 'vaga'
                                    }
                                ]
                            }
                        ]
                    }
                ],
            });

            // Calcular estatísticas
            const estatisticas = {
                totalEntrevistasAgendadas: entrevistasEntrevistador.length,
                totalCandidatosEntrevistados: await EntrevistaEntrevistadores.count({
                    where: { entrevistador_id: entrevistador.id }
                }),
                totalAprovacoes: await EntrevistaEntrevistadores.count({
                    where: {
                        observacoes: 'Aprovado',
                        entrevistador_id: entrevistador.id
                    }
                })
            };

            return {
                entrevistador: {
                    id: entrevistador.id,
                    nome: entrevistador.nome,
                    cargo: entrevistador.cargo
                },
                entrevistas: entrevistasEntrevistador.map(entrevistaEntrevistador => ({
                    id: entrevistaEntrevistador.entrevista.id,
                    data_entrevista: entrevistaEntrevistador.entrevista.data_entrevista,
                    hora_entrevista: entrevistaEntrevistador.entrevista.hora_entrevista,
                    local_link: entrevistaEntrevistador.entrevista.local_link,
                    candidatura: entrevistaEntrevistador.entrevista.candidatura,
                    vaga: entrevistaEntrevistador.entrevista.candidatura?.vaga
                })),
                estatisticas: {
                    totalEntrevistasAgendadas: estatisticas.totalEntrevistasAgendadas,
                    totalCandidatosEntrevistados: estatisticas.totalCandidatosEntrevistados,
                    totalAprovacoes: estatisticas.totalAprovacoes
                }
            };
        } catch (error) {
            console.error('Erro no serviço de dashboard do entrevistador:', error);
            throw error;
        }
    }
}

module.exports = new EntrevistadorService();
