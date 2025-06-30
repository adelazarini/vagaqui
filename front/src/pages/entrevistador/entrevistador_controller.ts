import { useState, useEffect } from 'react';
import { Entrevistador, Entrevista, EstatisticasEntrevistador } from '../../models/indice_models';
import EntrevistadorService from '../../services/entrevistador_service';
import { getCurrentUser } from '../../services/auth_service';
import { useNavigate } from 'react-router-dom';

export const useDashboardController = () => {
    const navigate = useNavigate();
    const [entrevistador, setEntrevistador] = useState<Entrevistador | null>(null);
    const [entrevistas, setEntrevistas] = useState<Entrevista[]>([]);
    const [estatisticas, setEstatisticas] = useState<EstatisticasEntrevistador>({
        totalEntrevistasAgendadas: 0,
        totalCandidatosEntrevistados: 0,
        totalAprovacoes: 0,
        totalProcessoSeletivo: 0,
        totalEntrevistasCombinar: 0,
        totalReprovacoes: 0

    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const usuario = getCurrentUser();

                if (!usuario || !usuario.id) {
                    setError('Usuário não autenticado');
                    setLoading(false);
                    navigate('/');
                    return;
                }
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
