import React from 'react';
import DashboardLayout from '../../components/layout/dashboard_layout';
import {
    DashboardContainer,
    SidebarProfile,
    MainContent,
    StatCard,
    StatsContainer,
    VagaItem,
    ProfileSection,
    ProfileAvatar,
    VagasContainer
} from '../candidato/candidato_styles';
import { useDashboardController } from './entrevistador_controller';


const DashboardEntrevistador: React.FC = () => {
    const {
        entrevistador,
        entrevistas,
        estatisticas,
        loading,
        error
    } = useDashboardController();

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;
    if (!entrevistador) return <div>Entrevistador não encontrado</div>;

    return (
        <DashboardLayout tipoUsuario="Entrevistador">
            <DashboardContainer>
                <SidebarProfile>
                    <ProfileSection>
                        <ProfileAvatar>
                            {entrevistador.nome.charAt(0).toUpperCase()}
                        </ProfileAvatar>
                        <h2>{entrevistador.nome}</h2>
                        <p>{entrevistador.email}</p>
                    </ProfileSection>

                    <StatsContainer>
                        <StatCard>
                            <h3>Entrevistas Agendadas</h3>
                            <span>{estatisticas.totalEntrevistasAgendadas}</span>
                        </StatCard>
                        <StatCard>
                            <h3>Processos Seletivos</h3>
                            <span>{estatisticas.totalProcessoSeletivo}</span>
                        </StatCard>
                        <StatCard>
                            <h3>Aprovações</h3>
                            <span>{estatisticas.totalAprovacoes}</span>
                        </StatCard>
                    </StatsContainer>


                </SidebarProfile>

                <MainContent>
                    <VagasContainer>
                        <h2>Minhas Entrevistas</h2>
                        {entrevistas.map(entrevista => (
                            <VagaItem key={entrevista.id}>
                                <div className="vaga-info">
                                    <h3>{entrevista.candidatura?.vaga?.titulo}</h3>
                                    <p>
                                        <strong>Data:</strong> {' '}
                                        {new Date(entrevista.data_entrevista).toLocaleDateString('pt-BR')}
                                    </p>
                                    <p>
                                        <strong>Hora:</strong> {entrevista.hora_entrevista}
                                    </p>
                                    <p>
                                        <strong>Local/Link:</strong> {entrevista.local_link}
                                    </p>
                                </div>
                            </VagaItem>
                        ))}
                    </VagasContainer>
                </MainContent>
            </DashboardContainer>
        </DashboardLayout>
    );
};

export default DashboardEntrevistador;