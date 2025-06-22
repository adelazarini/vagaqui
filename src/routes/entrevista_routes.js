const EntrevistaController = require('../controllers/entrevista_controller');
const authorize = require('../middlewares/authorize');
const baseRouter = require('./base_routes');

module.exports = (app) => {
    const controller = new EntrevistaController(app);

    // Usar baseRouter para CRUD básico
    const router = baseRouter(controller, {
        create: ['Administrador', 'Empresa'],
        findAll: ['Administrador', 'Empresa', 'Entrevistador'],
        findByPk: ['Administrador', 'Empresa', 'Entrevistador'],
        update: ['Administrador', 'Empresa', 'Entrevistador'],
        delete: ['Administrador', 'Empresa']
    });

    //Listar todos os entrevistadores de uma entrevista
    router.get('/:id/entrevistadores',
        authorize(['Administrador', 'Empresa', 'Entrevistador']),
        async (req, res) => {
            try {
                const { id } = req.params;

                const entrevista = await controller.model.findByPk(id, {
                    include: [{
                        model: app.db.Entrevistador,
                        as: 'entrevistadores',
                        attributes: ['id', 'nome', 'email', 'cargo'],
                        include: [{
                            model: app.db.Usuario,
                            as: 'usuario',
                            attributes: ['id', 'nome', 'email', 'tipo_usuario']
                        }]
                    }]
                });

                if (!entrevista) {
                    return res.status(404).json({ message: 'Entrevista não encontrada' });
                }

                res.status(200).json({
                    entrevista_id: id,
                    entrevistadores: entrevista.entrevistadores
                });
            } catch (error) {
                console.error('Erro ao buscar entrevistadores:', error);
                res.status(500).json({
                    message: 'Erro ao buscar entrevistadores',
                    error: error.message
                });
            }
        }
    );

    //Adicionar entrevistadores a uma entrevista
    router.post('/:id/entrevistadores',
        authorize(['Administrador', 'Empresa']),
        async (req, res) => {
            try {
                const { id } = req.params;
                const { entrevistadorIds } = req.body;

                if (!Array.isArray(entrevistadorIds) || entrevistadorIds.length === 0) {
                    return res.status(400).json({
                        message: 'É necessário fornecer um array de IDs de entrevistadores'
                    });
                }

                const entrevista = await controller.model.findByPk(id);
                if (!entrevista) {
                    return res.status(404).json({ message: 'Entrevista não encontrada' });
                }

                // Adicionar entrevistadores
                await entrevista.addEntrevistadores(entrevistadorIds);

                res.status(200).json({
                    message: 'Entrevistadores adicionados com sucesso',
                    entrevista_id: id,
                    entrevistadorIds
                });
            } catch (error) {
                console.error('Erro ao adicionar entrevistadores:', error);
                res.status(500).json({
                    message: 'Erro ao adicionar entrevistadores',
                    error: error.message
                });
            }
        }
    );

    //Remover um entrevistador de uma entrevista
    router.delete('/:id/entrevistadores/:entrevistadorId',
        authorize(['Administrador', 'Empresa']),
        async (req, res) => {
            try {
                const { id, entrevistadorId } = req.params;

                const entrevista = await controller.model.findByPk(id);
                if (!entrevista) {
                    return res.status(404).json({ message: 'Entrevista não encontrada' });
                }

                // Remover o entrevistador
                await entrevista.removeEntrevistador(entrevistadorId);

                res.status(200).json({
                    message: 'Entrevistador removido com sucesso',
                    entrevista_id: id,
                    entrevistador_id: entrevistadorId
                });
            } catch (error) {
                console.error('Erro ao remover entrevistador:', error);
                res.status(500).json({
                    message: 'Erro ao remover entrevistador',
                    error: error.message
                });
            }
        }
    );

    //Buscar entrevista completa por ID
    router.get('/:id/completa',
        authorize(['Administrador', 'Empresa', 'Entrevistador']),
        async (req, res) => {
            try {
                const { id } = req.params;

                const entrevista = await controller.model.findByPk(id, {
                    include: [
                        {
                            model: app.db.Entrevistador,
                            as: 'entrevistadores',
                            attributes: ['id', 'nome', 'email', 'cargo'],
                            include: [{
                                model: app.db.Usuario,
                                as: 'usuario',
                                attributes: ['id', 'nome', 'email']
                            }]
                        },
                        {
                            model: app.db.Candidatura,
                            as: 'candidatura',
                            include: [
                                {
                                    model: app.db.Candidato,
                                    as: 'candidato',
                                    attributes: ['id', 'nome', 'email', 'telefone', 'formacao']
                                },
                                {
                                    model: app.db.Vaga,
                                    as: 'vaga',
                                    attributes: ['id', 'titulo', 'descricao', 'salario', 'localizacao'],
                                    include: [{
                                        model: app.db.Empresa,
                                        as: 'empresa',
                                        attributes: ['id', 'nome', 'email', 'cnpj']
                                    }]
                                }
                            ]
                        }
                    ]
                });

                if (!entrevista) {
                    return res.status(404).json({ message: 'Entrevista não encontrada' });
                }

                res.status(200).json(entrevista);
            } catch (error) {
                console.error('Erro ao buscar entrevista completa:', error);
                res.status(500).json({
                    message: 'Erro ao buscar entrevista completa',
                    error: error.message
                });
            }
        }
    );

    // Buscar entrevistas por candidatura
    router.get('/candidatura/:candidaturaId',
        authorize(['Administrador', 'Empresa', 'Entrevistador', 'Candidato']),
        async (req, res) => {
            try {
                const { candidaturaId } = req.params;

                const entrevistas = await controller.model.findAll({
                    where: { candidatura_id: candidaturaId },
                    include: [
                        {
                            model: app.db.Entrevistador,
                            as: 'entrevistadores',
                            attributes: ['id', 'nome', 'email', 'cargo']
                        },
                        {
                            model: app.db.Candidatura,
                            as: 'candidatura',
                            include: [
                                {
                                    model: app.db.Candidato,
                                    as: 'candidato',
                                    attributes: ['id', 'nome', 'email']
                                },
                                {
                                    model: app.db.Vaga,
                                    as: 'vaga',
                                    attributes: ['id', 'titulo'],
                                    include: [{
                                        model: app.db.Empresa,
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
                console.error('Erro ao buscar entrevistas por candidatura:', error);
                res.status(500).json({
                    message: 'Erro ao buscar entrevistas por candidatura',
                    error: error.message
                });
            }
        }
    );

    return router;
};
