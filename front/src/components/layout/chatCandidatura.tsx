import React, { useState, useEffect, useRef } from 'react';
import MensagemService from '../../services/mensagem_service';
import { useAuth } from '../../context/auth_context';

interface ChatCandidaturaProps {
    candidaturaId: number;
}

const ChatCandidatura: React.FC<ChatCandidaturaProps> = ({ candidaturaId }) => {
    const [mensagens, setMensagens] = useState([]);
    const [novaMensagem, setNovaMensagem] = useState('');
    const { usuario } = useAuth();
    const chatEndRef = useRef(null);

    useEffect(() => {
        buscarMensagens();
        const intervalId = setInterval(buscarMensagens, 5000);
        return () => clearInterval(intervalId);
    }, [candidaturaId]);

    useEffect(() => {
        scrollToBottom();
    }, [mensagens]);

    const buscarMensagens = async () => {
        try {
            const mensagensCarregadas = await MensagemService.listarMensagens(candidaturaId);
            setMensagens(mensagensCarregadas);
        } catch (error) {
            console.error('Erro ao buscar mensagens:', error);
        }
    };

    const enviarMensagem = async () => {
        if (!novaMensagem.trim()) return;

        try {
            const mensagem = {
                usuarioId: usuario.id,
                usuarioNome: usuario.nome,
                conteudo: novaMensagem
            };

            await MensagemService.enviarMensagem(candidaturaId, mensagem);
            setNovaMensagem('');
            await buscarMensagens();
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
        }
    };

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="chat-container">
            <div className="mensagens">
                {mensagens.map((msg, index) => (
                    <div
                        key={index}
                        className={`mensagem ${msg.usuarioId === usuario.id ? 'enviada' : 'recebida'}`}
                    >
                        <strong>{msg.usuarioNome}</strong>
                        <p>{msg.conteudo}</p>
                        <small>{new Date(msg.timestamp).toLocaleString()}</small>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            <div className="input-mensagem">
                <input
                    type="text"
                    value={novaMensagem}
                    onChange={(e) => setNovaMensagem(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && enviarMensagem()}
                    placeholder="Digite sua mensagem"
                />
                <button onClick={enviarMensagem}>Enviar</button>
            </div>
        </div>
    );
};

export default ChatCandidatura;
