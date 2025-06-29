import { useState, useEffect } from 'react';
import { Entrevistador, Entrevista, Estatisticas } from '../../models/indice_models';
import EntrevistadorService from '../../services/entrevistador_service';

export const useDashboardController = () => {
    const [entrevistador, setEntrevistador] = useState<Entrevistador | null>(null);
    const [entrevistas, setEntrevistas] = useState<Entrevista[]>([]);
    const [estatisticas, setEstatisticas] = useState<Estatisticas>({
        totalCandidaturas: 0,
        totalProcessoSeletivo: 0,
        totalEntrevistasAgendadas: 0,
        totalAprovacoes: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const dados = await EntrevistadorService.obterDadosDashboard();

                setEntrevistador(dados.entrevistador);
                setEntrevistas(dados.entrevistas);
                setEstatisticas(dados.estatisticas);
            } catch (err: any) {
                setError(err.message || 'Erro ao carregar dashboard');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return {
        entrevistador,
        entrevistas,
        estatisticas,
        loading,
        error
    };
};
