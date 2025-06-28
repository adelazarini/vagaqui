import { useState, useEffect } from 'react';
import CandidatoService from '../../services/candidato_service';
import VagaService from '../../services/vaga_service';
import { Candidato } from '../../models/candidato';
import { Vaga } from '../../models/vaga';
import { Candidatura } from '../../models/candidatura';
import { getCurrentUser } from '../../services/auth_service';

export const useDashboardController = (usuarioId: number) => {
    const [candidato, setCandidato] = useState<Candidato | null>(null);
    const [vagas, setVagas] = useState<Vaga[]>([]);
    const [candidaturas, setCandidaturas] = useState<Candidatura[]>([]);
    const [estatisticas, setEstatisticas] = useState({
        totalCandidaturas: 0,
        totalEntrevistas: 0,
        totalAprovacoes: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDados = async () => {
            try {
                if (!usuarioId) {
                    throw new Error('ID de usuário não encontrado');
                }

                // Buscar dados do candidato
                const dadosCandidato = await CandidatoService.getDadosCandidato(usuarioId);
                setCandidato(dadosCandidato);

                // Buscar estatísticas
                const stats = await CandidatoService.getEstatisticas(dadosCandidato.id);
                setEstatisticas(stats);

                // Buscar vagas disponíveis
                const vagasDisponiveis = await VagaService.getVagasDisponiveis();
                setVagas(vagasDisponiveis);

                // Buscar candidaturas do candidato com detalhes da vaga
                const minhasCandidaturas = await CandidatoService.getCandidaturasComVagas(dadosCandidato.id);
                setCandidaturas(minhasCandidaturas);

            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDados();
    }, [usuarioId]);

    const handleCandidatar = async (vagaId: number) => {
        try {
            if (!candidato) {
                throw new Error('Candidato não encontrado');
            }
            await VagaService.candidatar(candidato.id, vagaId);
            // Atualizar lista de candidaturas
            const minhasCandidaturas = await CandidatoService.getCandidaturasComVagas(candidato.id);
            setCandidaturas(minhasCandidaturas);
        } catch (error) {
            console.error('Erro ao se candidatar:', error);
        }
    };

    return {
        candidato,
        vagas,
        candidaturas,
        estatisticas,
        handleCandidatar,
        loading,
        error
    };
};
