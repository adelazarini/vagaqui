import api from './api';

export const login = async (email, senha, tipoUsuario) => {
    try {
        const response = await api.post('/auth/login', {
            email,
            senha,
            tipoUsuario
        });

        // Salvar token no localStorage
        localStorage.setItem('token', response.data.token);

        return response.data;
    } catch (error) {
        console.error('Erro de login:', error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
};
