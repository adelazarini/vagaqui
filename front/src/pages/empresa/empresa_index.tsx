import React from 'react';
import {
    DashboardContainer,
    SidebarProfile,
    StatCard,
    StatsContainer,
    VagaItem,
    ProfileSection,
    ProfileAvatar,
    VagasContainer,
    UpdateProfileButton,
    ProximasEntrevistasContainer,
    MainContent
} from '../candidato/candidato_styles';

import { FloatingButton } from './empresa_styles';

import { FaPlus } from 'react-icons/fa';
import DashboardLayout from '../../components/layout/dashboard_layout';
import { useDashboardEmpresaController } from './empresa_controller';

const DashboardEmpresa: React.FC = () => {
    const {
        empresa,
        vagas,
        candidaturas,
        entrevistas,
        estatisticas,
        loading,
        error,
        handleNovaVaga
    } = useDashboardEmpresaController();

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;
    if (!empresa) return <div>Empresa não encontrada</div>;

    return (
        <DashboardLayout tipoUsuario="Empresa">
            <DashboardContainer>
                <SidebarProfile>
                    <ProfileSection>
                        <ProfileAvatar>
                            {empresa.nome.charAt(0).toUpperCase()}
                        </ProfileAvatar>
                        <h2>{empresa.nome}</h2>
                        <p>{empresa.email}</p>
                    </ProfileSection>

                    <StatsContainer>
                        <StatCard>
                            <h3>Vagas Publicadas</h3>
                            <span>{estatisticas.totalVagasPublicadas}</span>
                        </StatCard>
                        <StatCard>
                            <h3>Candidaturas</h3>
                            <span>{estatisticas.totalCandidaturasRecebidas}</span>
                        </StatCard>
                        <StatCard>
                            <h3>Entrevistas</h3>
                            <span>{estatisticas.totalEntrevistasAgendadas}</span>
                        </StatCard>
                        <StatCard>
                            <h3>Processos Seletivos</h3>
                            <span>{estatisticas.totalProcessoSeletivo}</span>
                        </StatCard>
                    </StatsContainer>

                    <div className="profile-info">
                        <h3>Perfil da Empresa</h3>
                        <p>CNPJ: {empresa.cnpj}</p>
                        <p>Telefone: {empresa.telefone || 'Não informado'}</p>
                        <button className="update-button">Atualizar Perfil</button>
                    </div>

                    <ProximasEntrevistasContainer>
                        <h3>Próximas Entrevistas</h3>
                        {entrevistas.map(entrevista => (
                            <div key={entrevista.id} className="entrevista-item">
                                <p>
                                    <strong>Data:</strong> {new Date(entrevista.data_entrevista).toLocaleDateString('pt-BR')}
                                </p>
                                <p>
                                    <strong>Hora:</strong> {entrevista.hora_entrevista}
                                </p>
                                <p>
                                    <strong>Local/Link:</strong> {entrevista.local_link}
                                </p>
                            </div>
                        ))}
                    </ProximasEntrevistasContainer>
                </SidebarProfile>

                <MainContent>
                    <VagasContainer>
                        <h2>Minhas Vagas</h2>
                        {vagas.map(vaga => (
                            <VagaItem key={vaga.id}>
                                <div className="vaga-info">
                                    <h3>{vaga.titulo}</h3>
                                    <p>{vaga.descricao}</p>
                                    <p className="salario">R$ {vaga.salario.toLocaleString('pt-BR')}</p>
                                    <p className="localizacao">{vaga.localizacao}</p>
                                    <p>Candidaturas: {vaga.total_candidaturas}</p>
                                </div>
                            </VagaItem>
                        ))}
                    </VagasContainer>

                    <VagasContainer>
                        <h2>Candidaturas Recebidas</h2>
                        {candidaturas.map(candidatura => (
                            <VagaItem key={candidatura.id}>
                                <div className="vaga-info">
                                    <h3>{candidatura.titulo_vaga}</h3>
                                    <p>
                                        <strong>Candidato:</strong> {candidatura.candidato.nome}
                                    </p>
                                    <p>
                                        <strong>Status:</strong> {candidatura.status}
                                    </p>
                                    <p>
                                        <strong>Data:</strong> {new Date(candidatura.data_candidatura).toLocaleDateString('pt-BR')}
                                    </p>
                                </div>
                            </VagaItem>
                        ))}
                    </VagasContainer>
                </MainContent>

                { }
                <FloatingButton onClick={handleNovaVaga}>
                    <FaPlus size={24} />
                </FloatingButton>
            </DashboardContainer>
        </DashboardLayout>
    );
};

export default DashboardEmpresa;
