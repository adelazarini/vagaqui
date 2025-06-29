import { useState, useEffect } from 'react';
import { Entrevistador, Entrevista, EstatisticasEntrevistador } from '../../models/indice_models';
import EntrevistadorService from '../../services/entrevistador_service';

export const useDashboardController = () => {
    const [entrevistador, setEntrevistador] = useState<Entrevistador | null>(null);
    const [entrevistas, setEntrevistas] = useState<Entrevista[]>([]);
    const [estatisticas, setEstatisticas] = useState<EstatisticasEntrevistador>({
        totalEntrevistasAgendadas: 0,
        totalCandidatosEntrevistados: 0,
        totalAprovacoes: 0,
        totalProcessoSeletivo: 0

    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
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

    const handleEditarEntrevista = (entrevistaId: number) => {
        console.log('Editar entrevista:', entrevistaId);
        // Implementar lógica de edição
    };

    const handleExcluirEntrevista = async (entrevistaId: number) => {
        if (window.confirm('Tem certeza que deseja excluir esta entrevista?')) {
            try {
                //  await EntrevistadorService.excluirEntrevista(entrevistaId);
                setEntrevistas(entrevistas.filter(e => e.id !== entrevistaId));
            } catch (err: any) {
                setError(err.message || 'Erro ao excluir entrevista');
            }
        }
    };

    return {
        entrevistador,
        entrevistas,
        estatisticas,
        loading,
        error,
        handleEditarEntrevista,
        handleExcluirEntrevista
    };
};
