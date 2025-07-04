const {
    Entrevista_Entrevistadores,
    Entrevista,
    Entrevistador,
    Candidatura,
    Usuario,
    EntrevistaEntrevistadores
} = require('../models');
const { Op } = require('sequelize');

class EntrevistaEntrevistadoresService {
    async criarEntrevistaEntrevistador(dadosEntrevista) {
        try {
            // Validar entrevista
            const entrevista = await Entrevista.findByPk(dadosEntrevista.entrevista_id);
            if (!entrevista) {
                throw new Error('Entrevista não encontrada');
            }

            // Validar entrevistador
            const entrevistador = await Entrevistador.findByPk(dadosEntrevista.entrevistador_id);
            if (!entrevistador) {
                throw new Error('Entrevistador não encontrado');
            }

            // Criar vínculo de entrevista com entrevistador
            const novaEntrevistaEntrevistador = await Entrevista_Entrevistadores.create({
                entrevista_id: dadosEntrevista.entrevista_id,
                entrevistador_id: dadosEntrevista.entrevistador_id,
                data_entrevista: dadosEntrevista.data_entrevista,
                hora_entrevista: dadosEntrevista.hora_entrevista,
                local_link: dadosEntrevista.local_link,
                observacoes: dadosEntrevista.observacoes
            });

            return novaEntrevistaEntrevistador;
        } catch (error) {
            throw new Error(`Erro ao criar entrevista-entrevistador: ${error.message}`);
        }
    }


    async atualizarEntrevista(id, dadosEntrevista, userId) {
        // Buscar o entrevistador pelo userId
        const usuario = await Usuario.findByPk(userId, {
            include: [{
                model: Entrevistador,
                as: 'entrevistador'
            }]
        });

        if (!usuario.entrevistador) {
            throw new Error('Entrevistador não encontrado');
        }
        const entrevistador = usuario.entrevistador;

        // Encontrar o registro de entrevista_entrevistadores existente
        const entrevistaEntrevistador = await EntrevistaEntrevistadores.findOne({
            where: {
                entrevista_id: id,
                entrevistador_id: entrevistador.id
            },
            include: [
                {
                    model: Entrevista,
                    as: 'entrevista'
                }
            ]
        });

        if (!entrevistaEntrevistador) {
            throw new Error('Registro de entrevista_entrevistadores não encontrado');
        }

        // Verificar se o entrevistador pertence à entrevista
        const entrevistadorVinculado = await EntrevistaEntrevistadores.findOne({
            where: {
                entrevista_id: entrevistaEntrevistador.entrevista_id,
                entrevistador_id: entrevistador.id
            }
        });

        if (!entrevistadorVinculado) {
            throw new Error('Não vinculado a entrevista');
        }

        // Campos que podem ser atualizados
        const camposAtualizaveis = [
            'data_entrevista',
            'hora_entrevista',
            'local_link',
            'observacoes',
            'status_entrevista'
        ];

        // Criar objeto com campos a serem atualizados
        const dadosParaAtualizar = {};
        camposAtualizaveis.forEach(campo => {
            if (dadosEntrevista[campo] !== undefined) {
                dadosParaAtualizar[campo] = dadosEntrevista[campo];
            }
        });

        // Atualizar campos
        const entrevistaAtualizada = await entrevistaEntrevistador.update(dadosParaAtualizar);

        return entrevistaAtualizada;
    }

    async ExcluiEntrevistaEntrevistador(id, userId) {
        try {
            const usuario = await Usuario.findByPk(userId, {
                include: [{
                    model: Entrevistador,
                    as: 'entrevistador'
                }]
            });

            if (!usuario.entrevistador) {
                throw new Error('Entrevistador não encontrado');
            }
            const entrevistador = usuario.entrevistador;

            const entrevista = await Entrevista.findOne({
                where: { id: id }
            });

            if (!entrevista) {
                throw new Error('Entrevista não encontrada');
            }

            const entrevistadorEntrevistador = await EntrevistaEntrevistadores.destroy({
                where: {
                    entrevista_id: id,
                    entrevistador_id: entrevistador.id
                }
            });

            if (entrevistadorEntrevistador === 0) {
                throw new Error('Nenhum registro de entrevista encontrado para exclusão');
            }

            return { message: 'Entrevista excluída com sucesso' };
        } catch (error) {
            throw new Error(`Erro ao excluir entrevista: ${error.message}`);
        }
    }
}

module.exports = new EntrevistaEntrevistadoresService();
