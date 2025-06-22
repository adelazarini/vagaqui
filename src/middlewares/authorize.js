function authorize(allowedRoles) {
    return (req, res, next) => {
        const { tipo_usuario } = req.user;
        if (!allowedRoles.includes(tipo_usuario)) {
            return res.status(403).json({ message: 'Acesso negado' });
        }

        next();
    };
}

module.exports = authorize;
