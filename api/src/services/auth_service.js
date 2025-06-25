const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario, Candidato, Empresa, Entrevistador } = require('../models');

class AuthService {
    async login(email, senha) {
        try {
            const usuario = await Usuario.findOne({ where: { email } });

            if (!usuario) {
                throw new Error('Usuário não encontrado');
            }

            const senhaValida = await bcrypt.compare(senha, usuario.senha);
            if (!senhaValida) {
                throw new Error('Senha incorreta');
            }

            const token = this.generateToken(usuario);

            // Atualizar token e último login
            await usuario.update({
                token,
                ultimo_login: new Date()
            });

            return {
                token,
                usuario: {
                    id: usuario.id,
                    email: usuario.email,
                    tipo_usuario: usuario.tipo_usuario,
                    nome: usuario.nome
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
            // Validações comuns
            if (!data.email) throw new Error('E-mail é obrigatório');
            if (!data.senha) throw new Error('Senha é obrigatória');
            if (!data.tipo_usuario) throw new Error('Tipo de usuário é obrigatório');
            if (!data.nome) throw new Error('Nome é obrigatório');

            // Verificar se email já existe
            const existingUser = await Usuario.findOne({
                where: { email: data.email }
            });
            if (existingUser) throw new Error('E-mail já cadastrado');

            // Hash da senha
            const hashedPassword = await bcrypt.hash(data.senha, 10);

            // Criar usuário no sistema
            const usuario = await Usuario.create({
                nome: data.nome,
                email: data.email,
                senha: hashedPassword,
                tipo_usuario: data.tipo_usuario
            });

            var response = {};
            switch (data.tipo_usuario) {
                case 'Candidato':

                    if (!data.nome) throw new Error('Nome é obrigatório');

                    response = await Candidato.create({
                        nome: data.nome,
                        telefone: data.telefone || null,
                        formacao: data.formacao || null,
                        experiencia: data.experiencia || null,
                        senha: hashedPassword,
                        usuario_id: usuario.id

                    });
                    break;

                case 'Entrevistador':
                    if (!data.nome) throw new Error('Nome é obrigatório');

                    response = await Entrevistador.create({
                        nome: data.nome,
                        email: data.email,
                        cargo: data.cargo || null,
                        senha: hashedPassword,
                        usuario_id: usuario.id
                    });
                    break;

                default:
                    throw new Error('Tipo de usuário inválido');
            }

            const token = this.generateToken(usuario);

            // Atualizar token e último login
            await usuario.update({
                token,
                ultimo_login: new Date()
            });

            return {
                token,
                usuario: {
                    id: usuario.id,
                    email: usuario.email,
                    tipo_usuario: usuario.tipo_usuario,
                    nome: usuario.nome
                },
            };
        } catch (error) {
            throw new Error(`Erro no registro: ${error.message}`);
        }
    }

    async forgotPassword(email) {
        try {
            const usuario = await Usuario.findOne({ where: { email } });
            if (!usuario) throw new Error('Usuário não encontrado');

            // Gerar token de reset
            const resetToken = require('crypto').randomBytes(20).toString('hex');
            const resetTokenExpires = Date.now() + 3600000; // 1 hora

            await usuario.update({
                reset_token: resetToken,
                reset_token_expires: resetTokenExpires
            });

            // TODO: Implementar envio de e-mail
            // await this.sendResetPasswordEmail(email, resetToken);

            return {
                message: 'E-mail de recuperação enviado',
                token: resetToken
            };
        } catch (error) {
            throw new Error(`Erro na recuperação de senha: ${error.message}`);
        }
    }

    async resetPassword(token, novaSenha) {
        try {
            const usuario = await Usuario.findOne({
                where: {
                    reset_token: token,
                    reset_token_expires: { [require('sequelize').Op.gt]: Date.now() }
                }
            });

            if (!usuario) throw new Error('Token inválido ou expirado');

            // Hash da nova senha
            const hashedPassword = await bcrypt.hash(novaSenha, 10);

            // Atualizar senha e limpar token de reset
            await usuario.update({
                senha: hashedPassword,
                reset_token: null,
                reset_token_expires: null
            });

            // Atualizar senha no perfil específico
            const modelMap = {
                'Candidato': Candidato,
                'Empresa': Empresa,
                'Entrevistador': Entrevistador
            };

            const PerfilModel = modelMap[usuario.tipo_usuario];
            const perfil = await PerfilModel.findOne({
                where: { id: usuario[`${usuario.tipo_usuario.toLowerCase()}_id`] }
            });

            if (perfil) {
                await perfil.update({ senha: hashedPassword });
            }

            return { message: 'Senha alterada com sucesso' };
        } catch (error) {
            throw new Error(`Erro na redefinição de senha: ${error.message}`);
        }
    }

    async logout(token) {
        try {
            const usuario = await Usuario.findOne({ where: { token } });

            if (usuario) {
                await usuario.update({
                    token: null
                });
            }

            return { message: 'Logout realizado com sucesso' };
        } catch (error) {
            throw new Error(`Erro no logout: ${error.message}`);
        }
    }
}

module.exports = new AuthService();
