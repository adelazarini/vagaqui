import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MensagemService from '../../services/mensagem_service';
import { CandidaturaComMensagens } from '../../models/mensagem';
import Usuario from '../../models/usuario';

const ListarMensagensController = () => {
    const [candidaturas, setCandidaturas] = useState<CandidaturaComMensagens[]>([]);
    const navigate = useNavigate();
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    useEffect(() => {
        const carregarMensagens = async () => {

            if (usuario) {
                try {
                    const mensagens = await MensagemService.obterMensagensPorUsuario();
                    setCandidaturas(mensagens);
                } catch (error) {
                    console.error('Erro ao carregar mensagens:', error);
                }
            } else {
                // Redirecionar para login se não houver usuário
                navigate('/login');
            }
        };

        carregarMensagens();

        const intervalId = setInterval(carregarMensagens, 60000);
        return () => clearInterval(intervalId);
    }, []);

    const abrirChat = (candidaturaId: number) => {
        navigate(`/chat/${candidaturaId}`);
    };

    return {
        candidaturas,
        abrirChat,
        usuario
    };
};

export default ListarMensagensController;
