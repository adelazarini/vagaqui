import api from './api';
import { Usuario } from '../models/usuario';

export const login = async (email, senha) => {
    try {
        const response = await api.post('/auth/login', {
            email,
            senha
        });

        const usuario = new Usuario({
            token: response.data.token
        });

        localStorage.setItem('token', usuario.token);

        return usuario;
    } catch (error) {
        console.error('Erro de login:', error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
};

export const getCurrentUser = () => {
    const usuarioStr = localStorage.getItem('usuario');
    return usuarioStr ? new Usuario(JSON.parse(usuarioStr)) : null;
};
