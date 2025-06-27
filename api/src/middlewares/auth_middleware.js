// middlewares/authMiddleware.js
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

        console.log(`Token decodificado: ${JSON.stringify(decoded)}`);

        // Buscar usuário pelo ID
        const usuario = await Usuario.findOne({
            where: {
                id: decoded.id
            }
        });

        if (!usuario) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }

        req.user = {
            id: usuario.id,
            tipo_usuario: usuario.tipo_usuario,
            email: usuario.email,
            nome: usuario.nome
        };

        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido' });
    }
};
