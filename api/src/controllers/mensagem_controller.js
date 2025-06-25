const Mensagem = require('../models/mensagem');
const { Usuario } = require('../models');

// Criar
exports.create = async (req, res) => {
    try {
        const { candidaturaId, usuarioId, conteudo } = req.body;

        const usuario = await Usuario.findByPk(usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const mensagem = await Mensagem.findOneAndUpdate(
            { candidaturaId: candidaturaId },
            {
                $push: {
                    mensagens: {
                        usuarioId: usuarioId,
                        usuarioNome: usuario.nome,
                        conteudo: conteudo
                    }
                },
                $addToSet: { participantes: usuarioId }
            },
            { upsert: true, new: true }
        );

        res.status(201).json(mensagem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Ler todos
exports.findAll = async (req, res) => {
    try {
        const mensagens = await Mensagem.find();
        res.json(mensagens);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Ler por ID
exports.findById = async (req, res) => {
    try {
        const mensagem = await Mensagem.findById(req.params.id);
        if (!mensagem) {
            return res.status(404).json({ message: 'Mensagem não encontrada' });
        }
        res.json(mensagem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Deletar
exports.delete = async (req, res) => {
    try {
        const mensagem = await Mensagem.findByIdAndDelete(req.params.id);
        if (!mensagem) {
            return res.status(404).json({ message: 'Mensagem não encontrada' });
        }
        res.json({ message: 'Mensagem deletada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
