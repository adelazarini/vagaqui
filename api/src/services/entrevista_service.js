const {
    Entrevistador,
    Usuario,
    Entrevista,
    Candidatura,
    Candidato,
    Vaga,
    Empresa,
    EntrevistaEntrevistadores,
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

            // Filtros especificos por tipo de usuario
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
            // busca entrevista com candidatura e vaga
            const entrevista = await Entrevista.findByPk(entrevistaId, {
                include: [{
                    model: Candidatura,
                    as: 'candidatura',
                    include: [{
                        model: Vaga,
                        as: 'vaga'
                    }]
                }]
            });

            if (!entrevista) {
                throw new Error('Entrevista não encontrada');
            }

            // validar permissao do usuario
            const usuario = await Usuario.findByPk(usuarioId, {
                include: [{
                    model: Empresa,
                    as: 'empresa'
                }]
            });

            if (!usuario || !usuario.empresa) {
                throw new Error('Usuário não autorizado - não é uma empresa');
            }

            // verificar se a vaga pertence empresa
            if (entrevista.candidatura.vaga.empresa_id !== usuario.empresa.id) {
                throw new Error('Não autorizado - a entrevista não pertence a uma vaga da sua empresa');
            }

            // processar vinculação de entrevistadores
            const novas = await Promise.all(
                entrevistadores.map(async data => {
                    // validar entrevistador
                    const ent = await Entrevistador.findByPk(data.entrevistador_id);
                    if (!ent) throw new Error(`Entrevistador ${data.entrevistador_id} não encontrado`);
                    console.log('EntrevistaEntrevistadores:', EntrevistaEntrevistadores);
                    const [assoc, created] = await EntrevistaEntrevistadores.findOrCreate({
                        where: {
                            entrevista_id: entrevistaId,
                            entrevistador_id: data.entrevistador_id
                        },
                        defaults: {
                            data_entrevista: data.data_entrevista,
                            hora_entrevista: data.hora_entrevista,
                            local_link: data.local_link,
                            observacoes: data.observacoes
                        },
                        transaction
                    });

                    if (!created) {
                        await assoc.update({
                            data_entrevista: data.data_entrevista,
                            hora_entrevista: data.hora_entrevista,
                            local_link: data.local_link,
                            observacoes: data.observacoes
                        }, { transaction });
                    }

                    return assoc;
                })
            );

            await transaction.commit();
            return novas;
        }
        catch (err) {
            await transaction.rollback();
            throw new Error(`Erro ao vincular entrevistadores: ${err.message}`);
        }
    }


    async removerEntrevistadorDaEntrevista(entrevistaId, entrevistadorId, usuarioId) {
        const transaction = await sequelize.transaction();

        try {
            // Buscar entrevista com candidatura e vaga
            const entrevista = await Entrevista.findByPk(entrevistaId, {
                include: [{
                    model: Candidatura,
                    as: 'candidatura',
                    include: [{
                        model: Vaga,
                        as: 'vaga'
                    }]
                }],
                transaction
            });

            if (!entrevista) {
                throw new Error('Entrevista não encontrada');
            }

            // Buscar usuário com suas relações
            const usuario = await Usuario.findByPk(usuarioId, {
                include: [
                    {
                        model: Empresa,
                        as: 'empresa'
                    },
                    {
                        model: Entrevistador,
                        as: 'entrevistador'
                    }
                ],
                transaction
            });

            if (!usuario) {
                throw new Error('Usuário não encontrado');
            }

            // Validar permissões baseadas no tipo de usuário
            if (usuario.tipo_usuario === 'Empresa') {
                // Empresa pode remover qualquer entrevistador de suas entrevistas
                if (!usuario.empresa) {
                    throw new Error('Usuário não tem empresa associada');
                }

                // Verificar se a vaga pertence à empresa
                if (entrevista.candidatura.vaga.empresa_id !== usuario.empresa.id) {
                    throw new Error('Não autorizado - a entrevista não pertence a uma vaga da sua empresa');
                }
            } else if (usuario.tipo_usuario === 'Entrevistador') {

                // Verificar se está tentando remover a si mesmo
                if (usuario.entrevistador.id !== parseInt(entrevistadorId)) {
                    throw new Error('Entrevistador só pode remover a si mesmo da entrevista');
                }

            } else if (usuario.tipo_usuario === 'Administrador') {
                // Administrador pode remover qualquer entrevistador
            } else {
                throw new Error('Tipo de usuário não autorizado para esta operação');
            }

            // Verificar se o entrevistador está vinculado à entrevista
            const vinculo = await EntrevistaEntrevistadores.findOne({
                where: {
                    entrevista_id: entrevistaId,
                    entrevistador_id: entrevistadorId
                },
                transaction
            });

            if (!vinculo) {
                throw new Error('Entrevistador não está vinculado a esta entrevista');
            }

            // Remover associação
            await sequelize.models.EntrevistaEntrevistadores.destroy({
                where: {
                    entrevista_id: entrevistaId,
                    entrevistador_id: entrevistadorId
                },
                transaction
            });

            await transaction.commit();

            return {
                success: true,
                message: usuario.tipo_usuario === 'Entrevistador'
                    ? 'Você foi removido da entrevista com sucesso'
                    : 'Entrevistador removido com sucesso',
                entrevista_id: entrevistaId,
                entrevistador_id: entrevistadorId,
                removido_por: {
                    id: usuario.id,
                    tipo: usuario.tipo_usuario
                }
            };
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
