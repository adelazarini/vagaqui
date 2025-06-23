const AuthService = require('../services/auth_service');

class AuthController {
    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const resultado = await AuthService.login(email, senha);
            res.json(resultado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async register(req, res) {
        try {
            const usuario = await AuthService.register(req.body);
            res.status(201).json(usuario);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new AuthController();
