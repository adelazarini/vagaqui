// src/pages/Candidato/Dashboard.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
    getCandidatoInfo,
    getVagasDisponiveis,
    getMinhsCandidaturas
} from '../../services/candidato_service';
import { logout } from '../../services/auth_services';

const DashboardContainer = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const SidebarContainer = styled.div`
  width: 300px;
  padding: 20px;
  background-color: #f4f4f4;
`;

const MainContent = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StatCard = styled.div`
  background-color: #f4f4f4;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  flex-grow: 1;
  margin: 0 10px;
`;

const VagaItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const CandidaturaButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
`;

const LogoutButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  margin-top: 20px;
`;

const DashboardCandidato = () => {
    const [candidato, setCandidato] = useState(null);
    const [vagas, setVagas] = useState([]);
    const [candidaturas, setCandidaturas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [infoCandidato, vagasDisponiveis, minhasCandidaturas] = await Promise.all([
                    getCandidatoInfo(),
                    getVagasDisponiveis(),
                    getMinhsCandidaturas()
                ]);

                setCandidato(infoCandidato);
                setVagas(vagasDisponiveis);
                setCandidaturas(minhasCandidaturas);
            } catch (error) {
                console.error('Erro ao carregar dashboard:', error);
                // Redirecionar para login em caso de erro
                navigate('/login');
            }
        };

        fetchDashboardData();
    }, [navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!candidato) return <div>Carregando...</div>;

    return (
        <DashboardContainer>
            <SidebarContainer>
                <ProfileSection>
                    <h2>{candidato.nome}</h2>
                    <p>{candidato.email}</p>
                </ProfileSection>

                <StatsContainer>
                    <StatCard>
                        <h3>Candidaturas</h3>
                        <p>{candidaturas.length}</p>
                    </StatCard>
                    <StatCard>
                        <h3>Entrevistas</h3>
                        <p>{candidato.entrevistas || 0}</p>
                    </StatCard>
                </StatsContainer>

                <div>
                    <h3>Perfil</h3>
                    <p>Telefone: {candidato.telefone}</p>
                    <button>Atualizar Perfil</button>
                </div>

                <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
            </SidebarContainer>

            <MainContent>
                <h2>Vagas Disponíveis</h2>
                {vagas.map(vaga => (
                    <VagaItem key={vaga.id}>
                        <div>
                            <h3>{vaga.titulo}</h3>
                            <p>{vaga.descricao}</p>
                            <p>R$ {vaga.salario}</p>
                        </div>
                        <CandidaturaButton>Candidatar-se</CandidaturaButton>
                    </VagaItem>
                ))}

                <h2>Minhas Candidaturas</h2>
                {candidaturas.map(candidatura => (
                    <VagaItem key={candidatura.id}>
                        <div>
                            <h3>{candidatura.vaga.titulo}</h3>
                            <p>{candidatura.empresa}</p>
                            <p>Status: {candidatura.status}</p>
                        </div>
                    </VagaItem>
                ))}
            </MainContent>
        </DashboardContainer>
    );
};

export default DashboardCandidato;
