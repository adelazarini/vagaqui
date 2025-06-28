import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/auth_service';
import { TIPOS_USUARIO, TipoUsuario } from '../../models/usuario';

export const useLoginController = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario>(TIPOS_USUARIO.CANDIDATO);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (!email || !senha || !tipoUsuario) {
                setError('Preencha todos os campos');
                return;
            }

            const usuario = await login({ email, senha, tipoUsuario });

            switch (usuario.tipo_usuario) {
                case TIPOS_USUARIO.CANDIDATO:
                    navigate('/candidato/dashboard');
                    break;
                case TIPOS_USUARIO.EMPRESA:
                    navigate('/empresa/dashboard');
                    break;
                case TIPOS_USUARIO.ENTREVISTADOR:
                    navigate('/entrevistador/dashboard');
                    break;
                default:
                    setError('Tipo de usuário inválido');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao fazer login');
        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        setEmail,
        senha,
        setSenha,
        tipoUsuario,
        setTipoUsuario,
        error,
        loading,
        handleLogin
    };
};
