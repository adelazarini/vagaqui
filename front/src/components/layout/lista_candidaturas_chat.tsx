import React, { useState, useEffect } from 'react';
import MensagemService from '../../services/mensagem_service';
import { useAuth } from '../../context/auth_context';

const ListaCandidaturasChat: React.FC = () => {
    const [candidaturas, setCandidaturas] = useState([]);
    const { usuario } = useAuth();

    useEffect(() => {
        const carregarCandidaturas = async () => {
            try {
                const candidaturasComMensagens = await MensagemService.obterCandidaturasComMensagens(usuario.id);
                setCandidaturas(candidaturasComMensagens);
            } catch (error) {
                console.error('Erro ao carregar candidaturas:', error);
            }
        };

        carregarCandidaturas();
    }, [usuario.id]);

    return (
        <div className="lista-candidaturas-chat">
            <h2>Candidaturas com Chat</h2>
            {candidaturas.map(candidatura => (
                <div
                    key={candidatura.id}
                    className={`candidatura-item ${candidatura.temMensagens ? 'com-mensagens' : ''}`}
                >
                    <h3>{candidatura.vaga.titulo}</h3>
                    {candidatura.temMensagens && (
                        <div className="ultima-mensagem">
                            <p>{candidatura.ultimaMensagem.conteudo}</p>
                            <small>{new Date(candidatura.ultimaMensagem.timestamp).toLocaleString()}</small>
                        </div>
                    )}
                    <button onClick={() => {/* Abrir chat específico */ }}>
                        Ver Chat
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ListaCandidaturasChat;
