import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface TopBarProps {
    tipoUsuario: string;
    titulo?: string;
}

const TopBarContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #3498db;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const TituloContainer = styled.div`
    color: white;
    font-size: 2rem;
    font-weight: bold;
    display: flex;
    align-items: center;
`;

const UserContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    color: white;
`;

const UserAvatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    color: #3498db;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
`;

const LogoutButton = styled.button`
    background-color: white;
    color: #3498db;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-weight: bold;
    transition: background-color 0.3s, transform 0.2s;

    &:hover {
        background-color: #f0f0f0;
        transform: scale(1.05);
    }
`;

const MessageIcon = styled.div`
    cursor: pointer;
    margin-right: 1rem;
    
    svg {
        width: 24px;
        height: 24px;
        color: white;
    }
`;

const TopBar: React.FC<TopBarProps> = ({
    tipoUsuario,
    titulo = 'VagaQui'
}) => {
    const navigate = useNavigate();
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        navigate('/');
    };

    const abrirMensagens = () => {
        navigate('/mensagem/listar');
    };

    return (
        <TopBarContainer>
            <TituloContainer>
                {titulo}
            </TituloContainer>
            <UserContainer>
                <MessageIcon onClick={abrirMensagens}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                    </svg>
                </MessageIcon>
                <UserAvatar>
                    {usuario.nome ? usuario.nome.charAt(0).toUpperCase() : ''}
                </UserAvatar>
                <div>
                    <p style={{ margin: 0 }}>{usuario.nome}</p>
                    <span style={{ fontSize: '0.75rem' }}>{tipoUsuario}</span>
                </div>
                <LogoutButton onClick={handleLogout}>
                    Sair
                </LogoutButton>
            </UserContainer>
        </TopBarContainer>
    );
};

export default TopBar;
