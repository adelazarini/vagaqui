const { Vaga, Empresa } = require('../models');
const { Op } = require('sequelize');

class VagaService {
    async filtrarVagas(filtros) {
        try {
            const conditions = {};

            if (filtros.titulo) {
                conditions.titulo = { [Op.iLike]: `%${filtros.titulo}%` };
            }
            if (filtros.localizacao) {
                conditions.localizacao = { [Op.iLike]: `%${filtros.localizacao}%` };
            }
            if (filtros.salario_min) {
                conditions.salario = {
                    ...(conditions.salario || {}),
                    [Op.gte]: parseFloat(filtros.salario_min)
                };
            }
            if (filtros.salario_max) {
                conditions.salario = {
                    ...(conditions.salario || {}),
                    [Op.lte]: parseFloat(filtros.salario_max)
                };
            }
            if (filtros.data_publicacao) {
                conditions.data_publicacao = { [Op.eq]: new Date(filtros.data_publicacao) };
            }
            if (filtros.data_encerramento) {
                conditions.data_encerramento = { [Op.eq]: new Date(filtros.data_encerramento) };
            }

            return await Vaga.findAll({ where: conditions });
        } catch (error) {
            throw new Error(`Erro ao filtrar vagas: ${error.message}`);
        }
    }

    async criarVaga(usuarioId, dadosVaga) {
        try {
            const empresa = await Empresa.findOne({
                where: { usuario_id: usuarioId }
            });

            if (!empresa) {
                throw new Error('Empresa não encontrada');
            }

            const novaVaga = await Vaga.create({
                ...dadosVaga,
                empresa_id: empresa.id,
                data_publicacao: new Date()
            });

            return novaVaga;
        } catch (error) {
            throw new Error(`Erro ao criar vaga: ${error.message}`);
        }
    }

    async listarVagasEmpresa(usuarioId) {
        try {
            const empresa = await Empresa.findOne({
                where: { usuario_id: usuarioId }
            });

            if (!empresa) {
                throw new Error('Empresa não encontrada');
            }

            return await Vaga.findAll({
                where: { empresa_id: empresa.id },
                order: [['data_publicacao', 'DESC']]
            });
        } catch (error) {
            throw new Error(`Erro ao listar vagas: ${error.message}`);
        }
    }
}

module.exports = new VagaService();
