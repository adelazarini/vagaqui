import React from 'react';
import DashboardLayout from '../../components/layout/dashboard_layout';
import ListarMensagensController from './listar_mensagens_controller';
import {
    DashboardContainer,
    SidebarProfile,
    MainContent,
    VagasContainer,
    VagaItem,
    ProfileSection,
    ProfileAvatar,
    ButtonContainer,
    EditButton
} from '../entrevistador/entrevistador_styles';

const ListarMensagens: React.FC = () => {
    const {
        candidaturas,
        abrirChat,
        usuario
    } = ListarMensagensController();

    return (
        <DashboardLayout tipoUsuario="Candidato">
            <DashboardContainer>
                <SidebarProfile>
                    <ProfileSection>
                        <ProfileAvatar>
                            {usuario?.nome ? usuario.nome.charAt(0).toUpperCase() : ''}
                        </ProfileAvatar>
                        <h2>{usuario?.nome}</h2>
                    </ProfileSection>
                </SidebarProfile>

                <MainContent>
                    <VagasContainer>
                        <h2>Minhas Conversas</h2>
                        {candidaturas.length === 0 ? (
                            <p>Nenhuma mensagem encontrada.</p>
                        ) : (
                            candidaturas.map(candidatura => (
                                <VagaItem
                                    key={candidatura.candidaturaId}
                                    onClick={() => abrirChat(candidatura.candidaturaId)}
                                >
                                    <div className="vaga-info">
                                        <h3>Candidatura #{candidatura.candidaturaId}</h3>
                                        <p>
                                            <strong>Última Mensagem:</strong> {candidatura.ultimaMensagem.conteudo}
                                        </p>
                                        <p>
                                            <strong>Enviada em:</strong> {' '}
                                            {new Date(candidatura.ultimaMensagem.timestamp).toLocaleString('pt-BR')}
                                        </p>
                                    </div>
                                    <ButtonContainer>
                                        <EditButton>
                                            Ver Conversa
                                        </EditButton>
                                    </ButtonContainer>
                                </VagaItem>
                            ))
                        )}
                    </VagasContainer>
                </MainContent>
            </DashboardContainer>
        </DashboardLayout>
    );
};

export default ListarMensagens;
