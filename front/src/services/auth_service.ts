import api from './api_service';
import { Usuario, TIPOS_USUARIO, TipoUsuario } from '../models/usuario';

export interface LoginCredentials {
    email: string;
    senha: string;
    tipoUsuario: TipoUsuario;
}

export const login = async (credentials: LoginCredentials): Promise<Usuario> => {
    try {
        const response = await api.post<{ usuario: Usuario, token: string }>('/auth/login', credentials);

        const usuario = new Usuario({
            ...response.data.usuario,
            token: response.data.token
        });

        localStorage.setItem('token', usuario.token || '');
        localStorage.setItem('usuario', JSON.stringify(usuario.toJSON()));
        localStorage.setItem('tipoUsuario', usuario.tipo_usuario);

        return usuario;
    } catch (error) {
        console.error('Erro de login:', error);
        throw error;
    }
};

export const logout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('tipoUsuario');
};

export const getCurrentUser = (): Usuario | null => {
    const usuarioStr = localStorage.getItem('usuario');
    return usuarioStr ? new Usuario(JSON.parse(usuarioStr)) : null;
};

export const getTipoUsuario = (): TipoUsuario | null => {
    return localStorage.getItem('tipoUsuario') as TipoUsuario | null;
};
