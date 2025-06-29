import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterService from '../../services/register_service';
import { TIPOS_USUARIO, TipoUsuario } from '../../models/usuario';

export const useRegisterController = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario>('');

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!tipoUsuario) {
            setError('Selecione um tipo de usuário');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const registroData = {
                nome,
                email,
                senha,
                tipo_usuario: tipoUsuario,
            };

            const response = await RegisterService.registrar(registroData);

            navigate('/login');

        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao cadastrar');
        } finally {
            setLoading(false);
        }
    };

    return {
        nome,
        email,
        senha,
        tipoUsuario,
        setNome,
        setEmail,
        setSenha,
        setTipoUsuario,
        error,
        loading,
        handleRegister
    };
};
