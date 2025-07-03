import React from 'react';
import DashboardLayout from '../../components/layout/dashboard_layout';
import AtualizarEntrevistaModal from './atualizar_entrevista/atualizar_entrevista_index';
import { useDashboardController } from './entrevistador_controller';
import { status_entrevista } from '../../models/entrevista';
import {
    DashboardContainer,
    SidebarProfile,
    MainContent,
    StatCard,
    StatsContainer,
    VagaItem,
    ProfileSection,
    ProfileAvatar,
    VagasContainer,
    ButtonContainer,
    EditButton,
    DeleteButton
} from './entrevistador_styles';

const DashboardEntrevistador: React.FC = () => {
    const {
        entrevistador,
        entrevistas,
        estatisticas,
        loading,
        error,
        handleEditarEntrevista,
        handleExcluirEntrevista,
        modalAberto,
        entrevistaSelecionada,
        handleFecharModal
    } = useDashboardController();

    if (loading) return <div>Carregando...</div>;
    if (!entrevistador) return <div>Entrevistador não encontrado</div>;

    const getStatusDescription = (status: string | undefined): string => {
        if (!status) return 'Status não disponível';

        const statusMap = {
            [status_entrevista.combinar]: 'A combinar',
            [status_entrevista.Agendada]: 'Agendada',
            [status_entrevista.Aprovado]: 'Aprovado',
            [status_entrevista.Reprovado]: 'Reprovado',
            [status_entrevista.Cancelada]: 'Cancelada',
        };

        return statusMap[status as keyof typeof statusMap] || 'Status desconhecido';
    };

    return (
        <DashboardLayout tipoUsuario="Entrevistador">
            <DashboardContainer>
                <SidebarProfile>
                    <ProfileSection>
                        <ProfileAvatar>
                            {entrevistador.nome.charAt(0).toUpperCase()}
                        </ProfileAvatar>
                        <h2>{entrevistador.nome}</h2>
                        <p>{entrevistador.cargo || 'Entrevistador'}</p>
                    </ProfileSection>

                    <StatsContainer>
                        <StatCard>
                            <h3>Entrevistas Agendadas</h3>
                            <span>{estatisticas.totalEntrevistasAgendadas}</span>
                        </StatCard>

                        <StatCard>
                            <h3>Entrevistas para Agendar</h3>
                            <span>{estatisticas.totalEntrevistasCombinar}</span>
                        </StatCard>
                        <StatCard>
                            <h3>Reprovações</h3>
                            <span>{estatisticas.totalReprovacoes}</span>
                        </StatCard>

                        <StatCard>
                            <h3>Aprovações</h3>
                            <span>{estatisticas.totalAprovacoes}</span>
                        </StatCard>

                        <StatCard>
                            <h3>Candidatos Entrevistados</h3>
                            <span>{estatisticas.totalCandidatosEntrevistados}</span>
                        </StatCard>
                    </StatsContainer>

                    <div className="profile-info">
                        <h3>Perfil</h3>
                        <p>Nome: {entrevistador.nome}</p>
                        <p>Cargo: {entrevistador.cargo || 'Não informado'}</p>
                        <button className="update-button">Atualizar Perfil</button>
                    </div>
                </SidebarProfile>

                <MainContent>
                    <VagasContainer>
                        <h2>Minhas Entrevistas</h2>
                        {entrevistas.map(entrevista => (
                            <VagaItem key={entrevista.id}>
                                <div className="vaga-info">
                                    <h3>{entrevista.candidatura?.vaga?.titulo || 'Título não disponível'}</h3>
                                    <p>
                                        <strong>Data da Entrevista:</strong>{' '}
                                        {entrevista.data_entrevista
                                            ? new Date(entrevista.data_entrevista).toLocaleDateString('pt-BR')
                                            : 'Data não disponível'
                                        }
                                    </p>
                                    <p>
                                        <strong>Nome do Entrevistado:</strong> {entrevista.candidatura.candidato.nome || 'Hora não disponível'}
                                    </p>
                                    <p>
                                        <strong>Hora da Entrevista:</strong> {entrevista.hora_entrevista || 'Hora não disponível'}
                                    </p>
                                    <p>
                                        <strong>Local/Link:</strong> {entrevista.local_link || 'Link não disponível'}
                                    </p>
                                    <p>
                                        <strong>Empresa:</strong> {entrevista.candidatura.vaga.empresa.nome || 'Empresa não disponível'}
                                    </p>
                                    <p>
                                        <strong>Observações:</strong> {entrevista.observacoes || ''}
                                    </p>
                                    <p>
                                        <strong>Status:</strong> {getStatusDescription(entrevista.status_entrevista)}
                                    </p>
                                </div>
                                <ButtonContainer>
                                    <EditButton
                                        onClick={() => handleEditarEntrevista(entrevista.id)}
                                    >
                                        Editar
                                    </EditButton>
                                    <DeleteButton
                                        onClick={() => handleExcluirEntrevista(entrevista.id)}
                                    >
                                        Excluir
                                    </DeleteButton>
                                </ButtonContainer>
                            </VagaItem>
                        ))}
                    </VagasContainer>
                </MainContent>

                {modalAberto && entrevistaSelecionada && (
                    <AtualizarEntrevistaModal
                        entrevistaId={entrevistaSelecionada.id}
                        dadosAtuais={{
                            data_entrevista: entrevistaSelecionada.data_entrevista instanceof Date
                                ? entrevistaSelecionada.data_entrevista.toISOString().split('T')[0]
                                : entrevistaSelecionada.data_entrevista,
                            hora_entrevista: entrevistaSelecionada.hora_entrevista,
                            local_link: entrevistaSelecionada.local_link,
                            observacoes: entrevistaSelecionada.observacoes,
                            status_entrevista: entrevistaSelecionada.status_entrevista
                        }}
                        isOpen={modalAberto}
                        onClose={handleFecharModal}
                    />
                )}
            </DashboardContainer>
        </DashboardLayout>
    );
};

export default DashboardEntrevistador;
