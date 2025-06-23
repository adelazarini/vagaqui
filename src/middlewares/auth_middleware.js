const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
        return res.status(401).json({ error: 'Erro no token' });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ error: 'Token mal formatado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Verificar se o usuário existe
        const usuario = await Usuario.findByPk(decoded.id);
        if (!usuario) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }

        // Adicionar usuário à requisição
        req.usuarioId = decoded.id;
        req.usuarioTipo = decoded.tipo_usuario;

        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido' });
    }
};
