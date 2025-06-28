import { useState, useEffect } from 'react';
import CandidatoService from '../services/CandidatoService';
import VagaService from '../services/VagaService';

export const useDashboardController = (usuarioId) => {
    const [candidato, setCandidato] = useState(null);
    const [vagas, setVagas] = useState([]);
    const [candidaturas, setCandidaturas] = useState([]);
    const [estatisticas, setEstatisticas] = useState({});

    useEffect(() => {
        const fetchDados = async () => {
            try {
                // Buscar dados do candidato
                const dadosCandidato = await CandidatoService.getDadosCandidato(usuarioId);
                setCandidato(dadosCandidato);

                // Buscar estatísticas
                const stats = await CandidatoService.getEstatisticas(dadosCandidato.id);
                setEstatisticas(stats);

                // Buscar vagas disponíveis
                const vagasDisponiveis = await VagaService.getVagasDisponiveis();
                setVagas(vagasDisponiveis);

                // Buscar candidaturas do candidato
                const minhasCandidaturas = await VagaService.getCandidaturasCandidato(dadosCandidato.id);
                setCandidaturas(minhasCandidaturas);

            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        };

        fetchDados();
    }, [usuarioId]);

    const handleCandidatar = async (vagaId) => {
        try {
            await VagaService.candidatar(candidato.id, vagaId);
            // Atualizar lista de candidaturas
        } catch (error) {
            console.error('Erro ao se candidatar:', error);
        }
    };

    return {
        candidato,
        vagas,
        candidaturas,
        estatisticas,
        handleCandidatar
    };
};
