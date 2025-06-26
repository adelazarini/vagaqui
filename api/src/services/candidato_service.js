const { Candidato, Vaga, Candidatura, Curriculo } = require('../models');
const { Op } = require('sequelize');

class CandidatoService {
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

    async obterDadosDashboard(usuarioId) {
        const candidato = await Candidato.findOne({
            where: { usuario_id: usuarioId },
            include: [
                {
                    model: Candidatura,
                    include: [{ model: Vaga }]
                },
                { model: Curriculo }
            ]
        });

        if (!candidato) {
            throw new Error('Candidato não encontrado');
        }

        const vagasDisponiveis = await Vaga.findAll({
            limit: 10,
            order: [['data_publicacao', 'DESC']]
        });

        return {
            candidato: {
                id: candidato.id,
                nome: candidato.nome,
                email: candidato.email,
                telefone: candidato.telefone
            },
            estatisticas: {
                totalCandidaturas: candidato.Candidaturas.length,
                totalEntrevistas: candidato.Candidaturas.filter(c => c.status === 'Entrevista').length,
                totalAprovacoes: candidato.Candidaturas.filter(c => c.status === 'Aprovado').length
            },
            candidaturas: candidato.Candidaturas,
            vagasDisponiveis,
            curriculo: candidato.Curriculo
        };
    }

    async uploadCurriculo(usuarioId, arquivoCurriculo) {
        const candidato = await Candidato.findOne({
            where: { usuario_id: usuarioId }
        });

        if (!candidato) {
            throw new Error('Candidato não encontrado');
        }

        // Lógica de upload do currículo
        const curriculo = await Curriculo.create({
            candidato_id: candidato.id,
            url_documento: arquivoCurriculo.path,
            data_envio: new Date()
        });

        return curriculo;
    }
}

module.exports = new CandidatoService();
