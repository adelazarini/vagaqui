const {
    Empresa,
    Vaga,
    Candidatura,
    Candidato,
    Entrevista,
    EntrevistaEntrevistadores,
    Entrevistador,
    sequelize
} = require('../models');
const { Op } = require('sequelize');

class EmpresaService {
    async obterDadosDashboard(usuarioId) {
        try {
            const empresa = await Empresa.findOne({
                attributes: ['id', 'nome', 'cnpj', 'telefone'],
                where: { usuario_id: usuarioId },
            });

            if (!empresa) {
                throw new Error('Empresa não encontrada');
            }

            const vagas = await Vaga.findAll({
                where: { empresa_id: empresa.id },
                include: [
                    {
                        model: Candidatura,
                        as: 'candidaturas',
                        include: [
                            {
                                model: Candidato,
                                as: 'candidato'
                            }
                        ]
                    }
                ],
                order: [['data_publicacao', 'DESC']]
            });

            // estracao  das IDs das candidaturas
            const candidaturasIds = vagas.flatMap(vaga =>
                vaga.candidaturas.map(candidatura => candidatura.id)
            );

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

            const entrevistasEntrevistador = await EntrevistaEntrevistadores.findAll({
                include: [
                    {
                        model: Entrevistador,
                        as: 'entrevistador'
                    },
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
                                        where: { empresa_id: empresa.id }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });

            const totalVagasPublicadas = await Vaga.count({
                where: { empresa_id: empresa.id }
            });

            const totalCandidaturasRecebidas = await Candidatura.count({
                include: [{
                    model: Vaga,
                    as: 'vaga',
                    where: { empresa_id: empresa.id }
                }]
            });

            const totalEntrevistasAgendadas = entrevistasEntrevistador.length;

            const vagasFormatadas = vagas.map(vaga => ({
                id: vaga.id,
                titulo: vaga.titulo,
                descricao: vaga.descricao,
                salario: vaga.salario,
                localizacao: vaga.localizacao,
                data_publicacao: vaga.data_publicacao,
                total_candidaturas: vaga.candidaturas ? vaga.candidaturas.length : 0,
                candidaturas: vaga.candidaturas ? vaga.candidaturas.map(candidatura => ({
                    id: candidatura.id,
                    status: candidatura.status,
                    data_candidatura: candidatura.data_candidatura,
                    candidato: candidatura.candidato ? {
                        id: candidatura.candidato.id,
                        nome: candidatura.candidato.nome,
                        email: candidatura.candidato.email
                    } : null,
                    entrevistas: entrevistasEntrevistador
                        .filter(ee =>
                            ee.entrevista &&
                            ee.entrevista.candidatura_id === candidatura.id
                        )
                        .map(ee => ({
                            id: ee.entrevista.id,
                            data_entrevista: ee.entrevista.data_entrevista,
                            hora_entrevista: ee.entrevista.hora_entrevista,
                            local_link: ee.entrevista.local_link,
                            entrevistadores: [{
                                id: ee.entrevistador_id,
                                nome: ee.entrevistador.nome
                            }]
                        }))
                })) : []
            }));

            return {
                empresa: {
                    id: empresa.id,
                    nome: empresa.nome,
                    cnpj: empresa.cnpj,
                    telefone: empresa.telefone
                },
                vagas: vagasFormatadas,
                entrevistas: entrevistas,
                estatisticas: {
                    totalVagasPublicadas,
                    totalCandidaturasRecebidas,
                    totalEntrevistasAgendadas,
                    totalProcessoSeletivo: processosSeletivos.length,
                }
            };
        } catch (error) {
            console.error('Erro no serviço de dashboard da empresa:', error);
            throw error;
        }
    }
}

module.exports = new EmpresaService();
