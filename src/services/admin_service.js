const bcrypt = require('bcryptjs');
const { Empresa, Usuario } = require('../models');

class AdminService {
    async criarEmpresa(data) {
        try {
            // Validações básicas
            if (!data.nome) throw new Error('Nome é obrigatório');
            if (!data.email) throw new Error('E-mail é obrigatório');
            if (!data.cnpj) throw new Error('CNPJ é obrigatório');
            if (!data.senha) throw new Error('Senha é obrigatória');

            // Verificar se email já existe
            const existingUser = await Usuario.findOne({
                where: { email: data.email }
            });
            if (existingUser) throw new Error('E-mail já cadastrado');

            // Hash da senha
            const hashedPassword = await bcrypt.hash(data.senha, 10);

            // Criar usuário associado
            const usuario = await Usuario.create({
                nome: data.nome,
                email: data.email,
                senha: hashedPassword,
                tipo_usuario: 'Empresa'
            });

            // Criar empresa
            const empresa = await Empresa.create({
                nome: data.nome,
                cnpj: data.cnpj,
                telefone: data.telefone || null,
                usuario_id: usuario.id
            });

            return {
                empresa,
                usuario: {
                    id: usuario.id,
                    email: usuario.email,
                    tipo_usuario: usuario.tipo_usuario
                }
            };
        } catch (error) {
            throw new Error(`Erro ao criar empresa: ${error.message}`);
        }
    }
}

module.exports = new AdminService();
