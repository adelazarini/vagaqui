const { Op } = require('sequelize');

const { Candidato, Vaga, Candidatura, Entrevista, Entrevistador, EntrevistaEntrevistadores, Empresa } = require('../models');
const empresa = require('../models/empresa');

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
                                        as: 'vaga',
                                        include: [{
                                            model: Empresa,
                                            as: 'empresa'
                                        }
                                        ]
                                    }, {
                                        model: Candidato,
                                        as: 'candidato',
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
                    data_entrevista: entrevistaEntrevistador.data_entrevista,
                    hora_entrevista: entrevistaEntrevistador.hora_entrevista,
                    local_link: entrevistaEntrevistador.local_link,
                    candidatura: entrevistaEntrevistador.entrevista.candidatura,
                    empresa: entrevistaEntrevistador.entrevista.empresa
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
