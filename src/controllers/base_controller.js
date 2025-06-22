class BaseController {
    constructor(model) {
        this.model = model;
    }

    async create(req, res) {
        try {
            const item = await this.model.create(req.body);
            return res.status(201).json(item);
        } catch (error) {
            return res.status(400).json({
                message: 'Erro ao criar',
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

            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({
                message: 'Erro ao deletar',
                error: error.message
            });
        }
    }
}

module.exports = BaseController;
