import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getCurrentUser } from '../../services/auth_services';
import api from '../../services/api';

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

const ProfileAvatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #3498db;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  margin-bottom: 10px;
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

const VagasContainer = styled.div`
  background-color: #f4f4f4;
  padding: 15px;
  border-radius: 8px;
`;

const VagaItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const CandidaturaButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
`;

const DashboardCandidato = () => {
    const [candidato, setCandidato] = useState(null);
    const [vagas, setVagas] = useState([]);

    useEffect(() => {
        const usuario = getCurrentUser();
        setCandidato(usuario);

        const fetchVagas = async () => {
            try {
                const response = await api.get('/vagas');
                setVagas(response.data);
            } catch (error) {
                console.error('Erro ao buscar vagas:', error);
            }
        };

        fetchVagas();
    }, []);

    if (!candidato) return <div>Carregando...</div>;

    return (
        <DashboardContainer>
            <SidebarContainer>
                <ProfileSection>
                    <ProfileAvatar>
                        {candidato.nome.charAt(0).toUpperCase()}
                    </ProfileAvatar>
                    <h2>{candidato.nome}</h2>
                    <p>{candidato.email}</p>
                </ProfileSection>

                <StatsContainer>
                    <StatCard>
                        <h3>Candidaturas</h3>
                        <p>12</p>
                    </StatCard>
                    <StatCard>
                        <h3>Entrevistas</h3>
                        <p>3</p>
                    </StatCard>
                </StatsContainer>

                <div>
                    <h3>Perfil</h3>
                    <p>Telefone: {candidato.telefone}</p>
                    <p>Currículo: {candidato.getCurriculoStatus()}</p>
                    <button>Atualizar Perfil</button>
                </div>
            </SidebarContainer>

            <MainContent>
                <h2>Vagas Disponíveis</h2>
                <VagasContainer>
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
                </VagasContainer>

                <h2>Minhas Candidaturas</h2>
                {/* Adicionar tabela de candidaturas */}
            </MainContent>
        </DashboardContainer>
    );
};

export default DashboardCandidato;
