const { Empresa } = require('../models');
const empresa = require('../models/empresa');
const AdminService = require('../services/admin_service');

const EmpresaService = require('../services/empresa_service');

class EmpresaController {

    async obterDadosDashboard(req, res) {
        try {
            const usuarioId = req.user.id;

            const dados = await EmpresaService.obterDadosDashboard(usuarioId);

            res.status(200).json(dados);
        } catch (error) {
            console.error('Erro ao obter dados do dashboard da empresa:', error);

            res.status(500).json({
                message: 'Erro ao obter dados do dashboard da empresa',
                error: error.message
            });
        }
    }
    async create(req, res) {
        try {
            const { empresa, usuario } = await AdminService.criarEmpresa(req.body);
            return res.status(200).json({ empresa, usuario });
        } catch (error) {
            return res.status(400).json({
                message: 'Erro ao criar empresa',
                error: error.message
            });
        }
    }

    async findAll(req, res) {
        try {
            const items = await this.model.findAll();
            return res.status(200).json(items);
        } catch (error) {
            return res.status(400).json({
                message: 'Erro ao listar',
                error: error.message
            });
        }
    }

    async findByPk(req, res) {
        try {
            const item = await this.model.findByPk(req.params.id);
            if (!item) {
                return res.status(404).json({ message: 'Item não encontrado' });
            }
            return res.status(200).json(item);
        } catch (error) {
            return res.status(400).json({
                message: 'Erro ao buscar',
                error: error.message
            });
        }
    }

    async update(req, res) {
        try {
            const [updated] = await this.model.update(
                req.body,
                { where: { id: req.params.id } }
            );

            if (!updated) {
                return res.status(404).json({ message: 'Item não encontrado' });
            }

            const updatedItem = await this.model.findByPk(req.params.id);
            return res.status(200).json(updatedItem);
        } catch (error) {
            return res.status(400).json({
                message: 'Erro ao atualizar',
                error: error.message
            });
        }
    }

    async delete(req, res) {
        try {
            const deleted = await this.model.destroy({
                where: { id: req.params.id }
            });

            if (!deleted) {
                return res.status(404).json({ message: 'Item não encontrado' });
            }

            return res.status(200).send();
        } catch (error) {
            return res.status(400).json({
                message: 'Erro ao deletar',
                error: error.message
            });
        }
    }

    async buscarPorCnpj(req, res) {
        try {
            const empresa = await Empresa.findOne({
                where: { cnpj: req.params.cnpj }
            });

            if (!empresa) {
                return res.status(404).json({ message: 'Candidato não encontrado' });
            }

            return res.status(200).json(empresa);
        } catch (error) {
            return res.status(400).json({
                message: 'Erro ao buscar empresa',
                error: error.message
            });
        }
    }
    async buscarPorEmail(req, res) {
        try {
            const empresa = await Empresa.findOne({
                where: { email: req.params.email }
            });

            if (!empresa) {
                return res.status(404).json({ message: 'Empresa não encontrado' });
            }

            return res.status(200).json(empresa);
        } catch (error) {
            return res.status(400).json({
                message: 'Erro ao buscar empresa',
                error: error.message
            });
        }
    }
}

module.exports = new EmpresaController();
