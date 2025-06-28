import React from 'react';
import { useDashboardController } from '../../controllers/DashboardController';
import {
    DashboardContainer,
    SidebarContainer,
    MainContent
} from './styles';

const DashboardCandidato = () => {
    const usuarioId = getCurrentUser().id;
    const {
        candidato,
        vagas,
        candidaturas,
        estatisticas,
        handleCandidatar
    } = useDashboardController(usuarioId);

    if (!candidato) return <div>Carregando...</div>;

    return (
        <DashboardContainer>
            <SidebarContainer>
                {/* Renderizar informações do perfil */}
                <ProfileStats estatisticas={estatisticas} />
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
