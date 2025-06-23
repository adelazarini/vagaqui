// authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

class AuthService {
    async login(email, senha) {
        try {
            // Buscar usuário apenas na tabela Usuario
            const usuario = await Usuario.findOne({
                where: { email }
            });

            if (!usuario) {
                throw new Error('Usuário não encontrado');
            }

            // Verificar senha
            const senhaValida = await bcrypt.compare(senha, usuario.senha);
            if (!senhaValida) {
                throw new Error('Senha incorreta');
            }

            // Gerar token
            const token = this.generateToken(usuario);

            return {
                token,
                usuario: {
                    id: usuario.id,
                    email: usuario.email,
                    tipo_usuario: usuario.tipo_usuario
                }
            };
        } catch (error) {
            throw new Error(`Erro no login: ${error.message}`);
        }
    }

    generateToken(usuario) {
        return jwt.sign(
            {
                id: usuario.id,
                email: usuario.email,
                tipo_usuario: usuario.tipo_usuario
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
    }

    async register(data) {
        try {
            // Validações básicas
            if (!data.email) throw new Error('E-mail é obrigatório');
            if (!data.senha) throw new Error('Senha é obrigatória');
            if (!data.tipo_usuario) throw new Error('Tipo de usuário é obrigatório');

            // Verificar se email já existe
            const existingUser = await Usuario.findOne({
                where: { email: data.email }
            });
            if (existingUser) throw new Error('E-mail já cadastrado');

            // Hash da senha
            const hashedPassword = await bcrypt.hash(data.senha, 10);

            // Criar usuário
            const usuario = await Usuario.create({
                email: data.email,
                senha: hashedPassword,
                tipo_usuario: data.tipo_usuario
            });

            return {
                id: usuario.id,
                email: usuario.email,
                tipo_usuario: usuario.tipo_usuario
            };
        } catch (error) {
            throw new Error(`Erro no registro: ${error.message}`);
        }
    }

    // Método de recuperação de senha
    async forgotPassword(email) {
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) throw new Error('Usuário não encontrado');

        // Gerar token de reset
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpires = Date.now() + 3600000; // 1 hora

        await usuario.update({
            reset_token: resetToken,
            reset_token_expires: resetTokenExpires
        });

        // Enviar e-mail com token de reset
        await this.sendResetPasswordEmail(email, resetToken);

        return { message: 'E-mail de recuperação enviado' };
    }

    async resetPassword(token, novaSenha) {
        const usuario = await Usuario.findOne({
            where: {
                reset_token: token,
                reset_token_expires: { [Op.gt]: Date.now() }
            }
        });

        if (!usuario) throw new Error('Token inválido ou expirado');

        // Hash da nova senha
        const hashedPassword = await bcrypt.hash(novaSenha, 10);

        await usuario.update({
            senha: hashedPassword,
            reset_token: null,
            reset_token_expires: null
        });

        return { message: 'Senha alterada com sucesso' };
    }
}

module.exports = new AuthService();
