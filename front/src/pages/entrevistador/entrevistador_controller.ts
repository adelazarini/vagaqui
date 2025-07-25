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
        totalProcessoSeletivo: 0,
        totalEntrevistasCombinar: 0,
        totalReprovacoes: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Novo estado para modal
    const [modalAberto, setModalAberto] = useState(false);
    const [entrevistaSelecionada, setEntrevistaSelecionada] = useState<Entrevista | null>(null);

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
        const entrevistaSelecionada = entrevistas.find(entrevista => entrevista.id === entrevistaId);

        if (entrevistaSelecionada) {
            setEntrevistaSelecionada(entrevistaSelecionada);
            setModalAberto(true);
        } else {
            console.error('Entrevista não encontrada');
        }
    };

    const handleFecharModal = () => {
        setModalAberto(false);
        setEntrevistaSelecionada(null);
    };

    const handleExcluirEntrevista = async (entrevistaId: number) => {
        if (window.confirm('Tem certeza que deseja excluir esta entrevista?')) {
            try {
                const ret = await EntrevistadorService.deleteEntrevista(entrevistaId);

                window.alert('Entrevista excluida com sucesso!.');

                setEntrevistas(entrevistas.filter(e => e.id !== entrevistaId));
            } catch (err: any) {
                console.error('Erro ao obter dados do dashboard:', error);
                if (err.response && err.response.status === 403) {
                    window.alert('Acesso negado. Verifique suas credenciais.');
                } else {
                    window.alert('Ocorreu um erro ao carregar os dados.');
                }
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
        handleExcluirEntrevista,
        modalAberto,
        entrevistaSelecionada,
        handleFecharModal
    };
};
