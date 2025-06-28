// src/pages/Candidato/Dashboard/index.tsx
import React from 'react';
import { getCurrentUser } from '../../services/auth_service';
import { useDashboardController } from './candidato_controller';
import {
    DashboardContainer,
    SidebarContainer,
    MainContent
} from './candidato_styles';
import {
    ProfileSection,
    StatCard,
    StatsContainer,
    ProfileAvatar,
    VagasContainer,
    VagaItem,
    CandidaturaButton,
    UpdateProfileButton
} from './candidato_styles';
import { Candidato } from '../../models/candidato';
import { Vaga } from '../../models/vaga';
import { Candidatura } from '../../models/candidatura';

// Definir interfaces para os componentes
interface ProfileStatsProps {
    estatisticas: {
        totalCandidaturas: number;
        totalEntrevistas: number;
        totalAprovacoes: number;
    };
}

interface VagasDisponiveisProps {
    vagas: Vaga[];
    onCandidatar: (vagaId: number) => void;
}

interface MinhasCandidaturasProps {
    candidaturas: Candidatura[];
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ estatisticas }) => (
    <StatsContainer>
        <StatCard>
            <h3>Candidaturas</h3>
            <p>{estatisticas.totalCandidaturas}</p>
        </StatCard>
        <StatCard>
            <h3>Entrevistas</h3>
            <p>{estatisticas.totalEntrevistas}</p>
        </StatCard>
        <StatCard>
            <h3>Aprovações</h3>
            <p>{estatisticas.totalAprovacoes}</p>
        </StatCard>
    </StatsContainer>
);

const VagasDisponiveis: React.FC<VagasDisponiveisProps> = ({ vagas, onCandidatar }) => (
    <VagasContainer>
        <h2>Vagas Disponíveis</h2>
        {vagas.map(vaga => (
            <VagaItem key={vaga.id}>
                <div>
                    <h3>{vaga.titulo}</h3>
                    <p>{vaga.descricao}</p>
                    <p>R$ {vaga.salario}</p>
                </div>
                <CandidaturaButton onClick={() => onCandidatar(vaga.id)}>
                    Candidatar-se
                </CandidaturaButton>
            </VagaItem>
        ))}
    </VagasContainer>
);

const MinhasCandidaturas: React.FC<MinhasCandidaturasProps> = ({ candidaturas }) => (
    <VagasContainer>
        <h2>Minhas Candidaturas</h2>
        {candidaturas.map(candidatura => (
            <VagaItem key={candidatura.id}>
                <div>
                    <h3>{candidatura.vaga.titulo}</h3>
                    <p>Status: {candidatura.status}</p>
                    <p>Data: {new Date(candidatura.data_candidatura).toLocaleDateString()}</p>
                </div>
            </VagaItem>
        ))}
    </VagasContainer>
);

const DashboardCandidato: React.FC = () => {
    const usuario = getCurrentUser();
    const {
        candidato,
        vagas,
        candidaturas,
        estatisticas,
        handleCandidatar,
        loading,
        error
    } = useDashboardController(usuario?.id);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;
    if (!candidato) return <div>Usuário não encontrado</div>;

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

                <ProfileStats estatisticas={estatisticas} />

                <div>
                    <h3>Perfil</h3>
                    <p>Telefone: {candidato.telefone}</p>
                    <p>Formação: {candidato.formacao}</p>
                    <UpdateProfileButton>Atualizar Perfil</UpdateProfileButton>
                </div>
            </SidebarContainer>

            <MainContent>
                <VagasDisponiveis
                    vagas={vagas}
                    onCandidatar={handleCandidatar}
                />
                <MinhasCandidaturas candidaturas={candidaturas} />
            </MainContent>
        </DashboardContainer>
    );
};

export default DashboardCandidato;
