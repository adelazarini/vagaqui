const { Op } = require('sequelize');

const { Candidato, Vaga, Candidatura, Entrevista, Entrevistador, EntrevistaEntrevistadores, Empresa, sequelize } = require('../models');
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
            const estatisticas = await EntrevistaEntrevistadores.findAll({
                attributes: [
                    'status_entrevista',
                    [sequelize.fn('COUNT', sequelize.col('status_entrevista')), 'count'],
                ],
                where: {
                    entrevistador_id: entrevistador.id
                },
                group: ['status_entrevista'],
                raw: true,
            });

            const estatisticasObj = estatisticas.reduce((acc, curr) => {
                acc[curr.status_entrevista] = parseInt(curr.count, 10) || 0;
                return acc;
            }, { 'Combinar': 0, 'Agendada': 0, 'Aprovado': 0, 'Reprovado': 0, 'Cancelada': 0 });

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
                    empresa: entrevistaEntrevistador.entrevista.empresa,
                    status_entrevista: entrevistaEntrevistador.status_entrevista
                })),
                estatisticas: {
                    totalEntrevistasAgendadas: estatisticasObj['Agendada'],
                    totalEntrevistasCombinar: estatisticasObj['Combinar'],
                    totalCandidatosEntrevistados: estatisticasObj['Aprovado'] + estatisticasObj['Reprovado'],
                    totalAprovacoes: estatisticasObj['Aprovado'],
                    totalReprovacoes: estatisticasObj['Reprovado']
                }
            };
        } catch (error) {
            console.error('Erro no serviço de dashboard do entrevistador:', error);
            throw error;
        }
    }
}

module.exports = new EntrevistadorService();
