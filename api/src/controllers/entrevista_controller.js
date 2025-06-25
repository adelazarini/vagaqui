const { Entrevista, sequelize } = require('../models');
const { Op } = require('sequelize');
const BaseController = require('./base_controller');

class EntrevistaController extends BaseController {
    constructor() {
        super(Entrevista);
    }

    async filter(req, res) {
        try {
            const { candidatura_id, entrevistador_id, data_entrevista, hora_entrevista } = req.query;

            const conditions = {};

            if (candidatura_id) {
                conditions.candidatura_id = candidatura_id;
            }

            // Montar query SQL para buscar na tabela associativa
            const query = `
                SELECT e.*, ee.data_entrevista, ee.hora_entrevista, ee.local_link, ee.observacoes
                FROM entrevistas e
                INNER JOIN entrevista_entrevistadores ee ON e.id = ee.entrevista_id
                WHERE 1=1
                ${entrevistador_id ? `AND ee.entrevistador_id = :entrevistador_id` : ''}
                ${data_entrevista ? `AND ee.data_entrevista = :data_entrevista` : ''}
                ${hora_entrevista ? `AND ee.hora_entrevista = :hora_entrevista` : ''}
                ${candidatura_id ? `AND e.candidatura_id = :candidatura_id` : ''}
            `;

            const entrevistas = await sequelize.query(query, {
                replacements: { entrevistador_id, data_entrevista, hora_entrevista, candidatura_id },
                type: sequelize.QueryTypes.SELECT
            });

            return res.status(200).json(entrevistas);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao filtrar entrevistas', error: error.message });
        }
    }

    // Listar entrevistadores da entrevista
    async listarEntrevistadores(req, res) {
        try {
            const { id } = req.params;
            const entrevista = await Entrevista.findByPk(id, {
                include: [{
                    model: this.app.db.Entrevistador,
                    as: 'entrevistadores',
                    attributes: ['id', 'nome', 'email', 'cargo'],
                    include: [{
                        model: this.app.db.Usuario,
                        as: 'usuario',
                        attributes: ['id', 'nome', 'email', 'tipo_usuario']
                    }]
                }]
            });

            if (!entrevista) return res.status(404).json({ message: 'Entrevista não encontrada' });

            res.status(200).json({
                entrevista_id: id,
                entrevistadores: entrevista.entrevistadores
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar entrevistadores', error: error.message });
        }
    }

    // Adicionar entrevistadores
    async adicionarEntrevistadores(req, res) {
        try {
            const { id } = req.params;
            const { entrevistadorIds } = req.body;
            if (!Array.isArray(entrevistadorIds) || entrevistadorIds.length === 0) {
                return res.status(400).json({
                    message: 'É necessário fornecer um array de IDs de entrevistadores'
                });
            }
            const entrevista = await Entrevista.findByPk(id);
            if (!entrevista) return res.status(404).json({ message: 'Entrevista não encontrada' });

            await entrevista.addEntrevistadores(entrevistadorIds);

            res.status(200).json({
                message: 'Entrevistadores adicionados com sucesso',
                entrevista_id: id,
                entrevistadorIds
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao adicionar entrevistadores', error: error.message });
        }
    }

    // Remover entrevistador
    async removerEntrevistador(req, res) {
        try {
            const { id, entrevistadorId } = req.params;
            const entrevista = await Entrevista.findByPk(id);
            if (!entrevista) return res.status(404).json({ message: 'Entrevista não encontrada' });

            await entrevista.removeEntrevistador(entrevistadorId);
            res.status(200).json({
                message: 'Entrevistador removido com sucesso',
                entrevista_id: id,
                entrevistador_id: entrevistadorId
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao remover entrevistador', error: error.message });
        }
    }

    // Buscar entrevista completa
    async buscarEntrevistaCompleta(req, res) {
        try {
            const { id } = req.params;
            const entrevista = await Entrevista.findByPk(id, {
                include: [
                    {
                        model: this.app.db.Entrevistador,
                        as: 'entrevistadores',
                        attributes: ['id', 'nome', 'email', 'cargo'],
                        include: [{
                            model: this.app.db.Usuario,
                            as: 'usuario',
                            attributes: ['id', 'nome', 'email']
                        }]
                    },
                    {
                        model: this.app.db.Candidatura,
                        as: 'candidatura',
                        include: [
                            {
                                model: this.app.db.Candidato,
                                as: 'candidato',
                                attributes: ['id', 'nome', 'email', 'telefone', 'formacao']
                            },
                            {
                                model: this.app.db.Vaga,
                                as: 'vaga',
                                attributes: ['id', 'titulo', 'descricao', 'salario', 'localizacao'],
                                include: [{
                                    model: this.app.db.Empresa,
                                    as: 'empresa',
                                    attributes: ['id', 'nome', 'email', 'cnpj']
                                }]
                            }
                        ]
                    }
                ]
            });
            if (!entrevista) return res.status(404).json({ message: 'Entrevista não encontrada' });
            res.status(200).json(entrevista);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar entrevista completa', error: error.message });
        }
    }

    // Buscar por candidatura
    async buscarPorCandidatura(req, res) {
        try {
            const { candidaturaId } = req.params;
            const entrevistas = await Entrevista.findAll({
                where: { candidatura_id: candidaturaId },
                include: [
                    {
                        model: this.app.db.Entrevistador,
                        as: 'entrevistadores',
                        attributes: ['id', 'nome', 'email', 'cargo']
                    },
                    {
                        model: this.app.db.Candidatura,
                        as: 'candidatura',
                        include: [
                            {
                                model: this.app.db.Candidato,
                                as: 'candidato',
                                attributes: ['id', 'nome', 'email']
                            },
                            {
                                model: this.app.db.Vaga,
                                as: 'vaga',
                                attributes: ['id', 'titulo'],
                                include: [{
                                    model: this.app.db.Empresa,
                                    as: 'empresa',
                                    attributes: ['id', 'nome']
                                }]
                            }
                        ]
                    }
                ]
            });
            res.status(200).json({
                candidatura_id: candidaturaId,
                total_entrevistas: entrevistas.length,
                entrevistas
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar entrevistas por candidatura', error: error.message });
        }
    }
}

module.exports = new EntrevistaController();
