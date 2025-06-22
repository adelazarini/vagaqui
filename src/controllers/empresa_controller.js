const { Empresa } = require('../models');
const empresa = require('../models/empresa');
const BaseController = require('./base_controller');

class EmpresaController extends BaseController {
    constructor() {
        super(Empresa);
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
