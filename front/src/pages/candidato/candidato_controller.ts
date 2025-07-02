import { useState, useEffect } from 'react';
import { getCurrentUser } from '../../services/auth_service';
import CandidatoService from '../../services/candidato_service';
import VagaService from '../../services/vaga_service';

import { Candidato, Candidatura, ProcessoSeletivo, Vaga, EstatisticasCandidato } from '../../models/indice_models';

export const useDashboardController = () => {
    const [candidato, setCandidato] = useState<Candidato | null>(null);
    const [candidaturas, setCandidaturas] = useState<Candidatura[]>([]);
    const [processosSeletivos, setProcessosSeletivos] = useState<ProcessoSeletivo[]>([]);
    const [vagasDisponiveis, setVagasDisponiveis] = useState<Vaga[]>([]);
    const [estatisticas, setEstatisticas] = useState<EstatisticasCandidato>({
        totalCandidaturas: 0,
        totalProcessoSeletivo: 0,
        totalEntrevistasAgendadas: 0,
        totalAprovacoes: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchDados();
    }, []);

    const fetchDados = async () => {
        try {
            const usuario = getCurrentUser();

            if (!usuario || !usuario.id) {
                setError('Usuário não autenticado');
                setLoading(false);
                return;
            }

            const dados = await CandidatoService.obterDadosDashboard();

            setCandidato(dados.candidato);
            setCandidaturas(dados.candidaturas || []);
            setProcessosSeletivos(dados.processosSeletivos || []);
            setVagasDisponiveis(dados.vagasDisponiveis || []);
            setEstatisticas(dados.estatisticas || {
                totalCandidaturas: 0,
                totalProcessoSeletivo: 0,
                totalEntrevistasAgendadas: 0,
                totalAprovacoes: 0
            });
        } catch (err: any) {
            setError(err.message || 'Erro ao carregar dados');
        } finally {
            setLoading(false);
        }
    };

    const handleCandidatar = async (vagaId: number) => {
        try {
            if (!candidato) {
                throw new Error('Candidato não encontrado');
            }

            await VagaService.candidatar(vagaId);
            window.alert('Candidatura com sucesso!.');
            await fetchDados();
        } catch (err) {
            window.alert('Erro ao candidatar.');
            console.error('Erro ao se candidatar:', err);
        }
    };

    return {
        candidato,
        candidaturas,
        processosSeletivos,
        vagasDisponiveis,
        estatisticas,
        loading,
        error,
        handleCandidatar
    };
};
