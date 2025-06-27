const {
    Entrevista_Entrevistadores,
    Entrevista,
    Entrevistador,
    Candidatura
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

    async buscarEntrevistasDoEntrevistador(entrevistadorId) {
        try {
            const entrevistas = await Entrevista_Entrevistadores.findAll({
                where: { entrevistador_id: entrevistadorId },
                include: [
                    {
                        model: Entrevista,
                        include: [
                            {
                                model: Candidatura,
                                include: ['Candidato', 'Vaga']
                            }
                        ]
                    }
                ],
                order: [['data_entrevista', 'DESC']]
            });

            return entrevistas;
        } catch (error) {
            throw new Error(`Erro ao buscar entrevistas do entrevistador: ${error.message}`);
        }
    }

    async atualizarEntrevistaEntrevistador(id, dadosAtualizacao) {
        try {
            const entrevistaEntrevistador = await Entrevista_Entrevistadores.findByPk(id);

            if (!entrevistaEntrevistador) {
                throw new Error('Registro de entrevista-entrevistador não encontrado');
            }

            return await entrevistaEntrevistador.update(dadosAtualizacao);
        } catch (error) {
            throw new Error(`Erro ao atualizar entrevista-entrevistador: ${error.message}`);
        }
    }
}

module.exports = new EntrevistaEntrevistadoresService();
