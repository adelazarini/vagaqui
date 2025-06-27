const {
    Entrevista,
    Candidatura,
    Candidato,
    Vaga,
    Empresa,
    sequelize
} = require('../models');
const { Op } = require('sequelize');

class EntrevistaService {
    async criarEntrevista(dadosEntrevista, usuarioId) {

        // Iniciar transação para garantir atomicidade
        const transaction = await sequelize.transaction();

        try {
            // Buscar usuário empresa logado
            const empresa = await Empresa.findOne({
                where: { usuario_id: usuarioId }
            });

            //validar candidatura
            const candidatura = await Candidatura.findOne({
                where: {
                    id: dadosEntrevista.candidatura_id
                },
                include: [
                    {
                        model: Vaga,
                        as: 'vaga',
                        where: { empresa_id: empresa.id },
                        required: true
                    },
                    {
                        model: Candidato,
                        as: 'candidato'
                    }
                ]
            });

            // Opção 1: JSON.stringify (mais legível)
            console.log("candidatura:", JSON.stringify(candidatura, null, 2));

            // Opção 2: Usando console.log direto (sem concatenação)
            console.log("candidatura:", candidatura);

            // Opção 3: Exibir apenas os dados (sem metadata do Sequelize)
            console.log("candidatura:", candidatura.toJSON());

            // Opção 4: Exibir propriedades específicas
            console.log("candidatura:", {
                id: candidatura.id,
                vaga: candidatura.vaga,
                candidato: candidatura.candidato,
                status: candidatura.status
            });

            if (!candidatura || !candidatura.vaga) {
                throw new Error('Candidatura não encontrada ou não pertence à empresa logada');
            }
            // Criar entrevista
            const novaEntrevista = await Entrevista.create({
                candidatura_id: dadosEntrevista.candidatura_id,
                observacoes: dadosEntrevista.observacoes
            }, { transaction });

            await transaction.commit();

            // Retornar entrevista com dados da candidatura
            return {
                ...novaEntrevista.toJSON(),
                candidatura: {
                    candidato: candidatura.candidato,
                    vaga: candidatura.vaga
                }
            };
        } catch (error) {
            await transaction.rollback();
            throw new Error(`Erro ao criar entrevista: ${error.message}`);
        }
    }

    async filtrarEntrevistas(filtros, usuarioId, tipoUsuario) {
        try {
            const {
                candidatura_id,
                data_entrevista,
                status
            } = filtros;

            const conditions = {};

            // Filtros específicos por tipo de usuário
            if (tipoUsuario === 'Candidato') {
                const candidato = await Candidato.findOne({
                    where: { usuario_id: usuarioId }
                });

                if (!candidato) {
                    throw new Error('Candidato não encontrado');
                }

                const candidaturas = await Candidatura.findAll({
                    where: { candidato_id: candidato.id }
                });

                conditions.candidatura_id = {
                    [Op.in]: candidaturas.map(c => c.id)
                };
            }

            if (candidatura_id) conditions.candidatura_id = candidatura_id;
            if (data_entrevista) conditions.data_entrevista = data_entrevista;
            if (status) conditions.status = status;

            // Query com joins complexos
            const entrevistas = await Entrevista.findAll({
                where: conditions,
                include: [
                    {
                        model: Candidatura,
                        include: [
                            {
                                model: Candidato
                            },
                            {
                                model: Vaga,
                                include: [{ model: Empresa }]
                            }
                        ]
                    }
                ],
                order: [['data_entrevista', 'DESC']]
            });

            return entrevistas;
        } catch (error) {
            throw new Error(`Erro ao filtrar entrevistas: ${error.message}`);
        }
    }

    async buscarEntrevistaCompleta(entrevistaId, usuarioId, tipoUsuario) {
        try {
            const conditions = { id: entrevistaId };

            // Filtros de acesso baseados no tipo de usuário
            if (tipoUsuario === 'Candidato') {
                const candidato = await Candidato.findOne({
                    where: { usuario_id: usuarioId }
                });

                const candidaturas = await Candidatura.findAll({
                    where: { candidato_id: candidato.id }
                });

                conditions.candidatura_id = {
                    [Op.in]: candidaturas.map(c => c.id)
                };
            }

            const entrevista = await Entrevista.findOne({
                where: conditions,
                include: [
                    {
                        model: Candidatura,
                        include: [
                            {
                                model: Candidato
                            },
                            {
                                model: Vaga,
                                include: [{ model: Empresa }]
                            }
                        ]
                    }
                ]
            });

            if (!entrevista) {
                throw new Error('Entrevista não encontrada ou sem permissão de acesso');
            }

            return entrevista;
        } catch (error) {
            throw new Error(`Erro ao buscar entrevista: ${error.message}`);
        }
    }

    async atualizarStatusEntrevista(entrevistaId, novoStatus, usuarioId) {
        const transaction = await sequelize.transaction();

        try {
            const entrevista = await Entrevista.findByPk(entrevistaId);
            if (!entrevista) {
                throw new Error('Entrevista não encontrada');
            }

            // Atualizar status
            await entrevista.update({ status: novoStatus }, { transaction });

            await transaction.commit();

            return entrevista;
        } catch (error) {
            await transaction.rollback();
            throw new Error(`Erro ao atualizar status da entrevista: ${error.message}`);
        }
    }
    async buscarEntrevistadoresDaEntrevista(entrevistaId, usuarioId, tipoUsuario) {
        try {
            // Verificar permissão
            const entrevista = await Entrevista.findByPk(entrevistaId);
            if (!entrevista) {
                throw new Error('Entrevista não encontrada');
            }

            // Buscar entrevistadores associados
            const entrevistadores = await Entrevistador.findAll({
                include: [
                    {
                        model: Entrevista,
                        where: { id: entrevistaId },
                        through: {
                            attributes: ['data_entrevista', 'hora_entrevista', 'local_link', 'observacoes']
                        }
                    }
                ]
            });

            return entrevistadores;
        } catch (error) {
            throw new Error(`Erro ao buscar entrevistadores: ${error.message}`);
        }
    }

    async vincularEntrevistadores(entrevistaId, entrevistadores, usuarioId) {
        const transaction = await sequelize.transaction();

        try {
            // Validar entrevista
            const entrevista = await Entrevista.findByPk(entrevistaId);
            if (!entrevista) {
                throw new Error('Entrevista não encontrada');
            }

            // Validar permissão do usuário
            const usuario = await Usuario.findByPk(usuarioId, {
                include: [{ model: Empresa }]
            });

            if (!usuario || !usuario.Empresa) {
                throw new Error('Usuário não autorizado');
            }

            // Processar vinculação de entrevistadores
            const novasAssociacoes = await Promise.all(
                entrevistadores.map(async (entrevistadorData) => {
                    // Validar entrevistador
                    const entrevistador = await Entrevistador.findByPk(entrevistadorData.entrevistador_id);
                    if (!entrevistador) {
                        throw new Error(`Entrevistador ${entrevistadorData.entrevistador_id} não encontrado`);
                    }

                    // Criar ou atualizar associação
                    const [associacao] = await sequelize.models.Entrevista_Entrevistadores.findOrCreate({
                        where: {
                            entrevista_id: entrevistaId,
                            entrevistador_id: entrevistadorData.entrevistador_id
                        },
                        defaults: {
                            data_entrevista: entrevistadorData.data_entrevista,
                            hora_entrevista: entrevistadorData.hora_entrevista,
                            local_link: entrevistadorData.local_link,
                            observacoes: entrevistadorData.observacoes_individuais
                        },
                        transaction
                    });

                    return associacao;
                })
            );

            await transaction.commit();
            return novasAssociacoes;
        } catch (error) {
            await transaction.rollback();
            throw new Error(`Erro ao vincular entrevistadores: ${error.message}`);
        }
    }

    async removerEntrevistadorDaEntrevista(entrevistaId, entrevistadorId, usuarioId) {
        const transaction = await sequelize.transaction();

        try {
            // Validar entrevista
            const entrevista = await Entrevista.findByPk(entrevistaId);
            if (!entrevista) {
                throw new Error('Entrevista não encontrada');
            }

            // Validar permissão do usuário
            const usuario = await Usuario.findByPk(usuarioId, {
                include: [{ model: Empresa }]
            });

            if (!usuario || !usuario.Empresa) {
                throw new Error('Usuário não autorizado');
            }

            // Remover associação
            const removido = await sequelize.models.Entrevista_Entrevistadores.destroy({
                where: {
                    entrevista_id: entrevistaId,
                    entrevistador_id: entrevistadorId
                },
                transaction
            });

            if (removido === 0) {
                throw new Error('Entrevistador não encontrado nesta entrevista');
            }

            await transaction.commit();
            return true;
        } catch (error) {
            await transaction.rollback();
            throw new Error(`Erro ao remover entrevistador: ${error.message}`);
        }
    }

    async buscarEntrevistasPorCandidatura(candidaturaId, usuarioId, tipoUsuario) {
        try {
            // Validar acesso do usuário
            let conditions = { candidatura_id: candidaturaId };

            if (tipoUsuario === 'Candidato') {
                const candidato = await Candidato.findOne({
                    where: { usuario_id: usuarioId }
                });

                if (!candidato) {
                    throw new Error('Candidato não encontrado');
                }

                const candidatura = await Candidatura.findOne({
                    where: {
                        id: candidaturaId,
                        candidato_id: candidato.id
                    }
                });

                if (!candidatura) {
                    throw new Error('Candidatura não encontrada ou sem permissão de acesso');
                }
            }

            // Buscar entrevistas
            const entrevistas = await Entrevista.findAll({
                where: conditions,
                include: [
                    {
                        model: Candidatura,
                        include: [
                            { model: Candidato },
                            {
                                model: Vaga,
                                include: [{ model: Empresa }]
                            }
                        ]
                    }
                ],
                order: [['data_entrevista', 'DESC']]
            });

            return {
                candidatura_id: candidaturaId,
                total_entrevistas: entrevistas.length,
                entrevistas
            };
        } catch (error) {
            throw new Error(`Erro ao buscar entrevistas da candidatura: ${error.message}`);
        }
    }
}

module.exports = new EntrevistaService();
