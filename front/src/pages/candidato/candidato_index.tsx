import React from 'react';
import DashboardLayout from '../../components/layout/dashboard_layout';

import {
    DashboardContainer,
    SidebarProfile,
    MainContent,
    StatCard,
    StatsContainer,
    VagaItem,
    CandidaturaButton,
    ProfileSection,
    ProximasEntrevistasContainer,
    ProfileAvatar,
    VagasContainer,
    UpdateProfileButton
} from './candidato_styles';
import { useDashboardController } from './candidato_controller';

const DashboardCandidato: React.FC = () => {
    const {
        candidato,
        candidaturas,
        processosSeletivos,
        vagasDisponiveis,
        estatisticas,
        loading,
        error,
        handleCandidatar
    } = useDashboardController();

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;
    if (!candidato) return <div>Candidato não encontrado</div>;

    return (
        <DashboardLayout tipoUsuario="Candidato">
            <DashboardContainer>
                <SidebarProfile>
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
                            <span>{estatisticas.totalCandidaturas}</span>
                        </StatCard>
                        <StatCard>
                            <h3>Entrevistas</h3>
                            <span>{estatisticas.totalEntrevistasAgendadas}</span>
                        </StatCard>
                        <StatCard>
                            <h3>Aprovações</h3>
                            <span>{estatisticas.totalAprovacoes}</span>
                        </StatCard>
                    </StatsContainer>


                    <div className="profile-info">
                        <h3>Perfil</h3>
                        <p>Telefone: {candidato.telefone || 'Não informado'}</p>
                        <p>Formação: {candidato.formacao || 'Não informado'}</p>
                        <button className="update-button">Atualizar Perfil</button>
                    </div>

                    <ProximasEntrevistasContainer>
                        <h3>Próximas Entrevistas</h3>
                        {processosSeletivos
                            .filter(p => p.temEntrevistadorAgendado)
                            .map(processo => (
                                <div key={processo.id} className="entrevista-item">
                                    {processo.entrevistadores.map((ent, index) => (
                                        <div key={index}>
                                            <p>
                                                <strong>{ent.entrevistador?.nome || 'Entrevistador'}</strong>
                                            </p>
                                            <p>{ent.local_link}</p>
                                            <p>
                                                {new Date(ent.data_entrevista).toLocaleDateString('pt-BR')}
                                                {' às '}
                                                {ent.hora_entrevista}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                    </ProximasEntrevistasContainer>
                </SidebarProfile>

                <MainContent>
                    <VagasContainer>
                        <h2>Vagas Disponíveis</h2>
                        {vagasDisponiveis.map(vaga => (
                            <VagaItem key={vaga.id}>
                                <div className="vaga-info">
                                    <h3>{vaga.titulo}</h3>
                                    <p>{vaga.descricao}</p>
                                    <p className="salario">R$ {vaga.salario.toLocaleString('pt-BR')}</p>
                                    <p className="localizacao">{vaga.localizacao}</p>
                                </div>
                                <CandidaturaButton
                                    onClick={() => handleCandidatar(vaga.id)}
                                    disabled={candidaturas.some(c => c.vaga_id === vaga.id)}
                                >
                                    {candidaturas.some(c => c.vaga_id === vaga.id)
                                        ? 'Candidatado'
                                        : 'Candidatar-se'}
                                </CandidaturaButton>
                            </VagaItem>
                        ))}
                    </VagasContainer>

                    <VagasContainer>
                        <h2>Minhas Candidaturas</h2>
                        {candidaturas.map(candidatura => (
                            <VagaItem key={candidatura.id}>
                                <div className="vaga-info">
                                    <h3>{candidatura.vaga.titulo}</h3>
                                    <p>
                                        <strong>Status:</strong> {candidatura.status}
                                    </p>
                                    <p>
                                        <strong>Data:</strong> {' '}
                                        {new Date(candidatura.data_candidatura).toLocaleDateString('pt-BR')}
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

export default DashboardCandidato;

