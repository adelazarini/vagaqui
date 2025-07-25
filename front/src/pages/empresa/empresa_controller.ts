import { useState, useEffect } from 'react';
import { getCurrentUser } from '../../services/auth_service';
import EmpresaService from '../../services/empresa_service';
import EntrevistadorService from '../../services/entrevistador_service';
import EntrevistaService from '../../services/entrevista_service';
import VagaService from '../../services/vaga_service';


import {
    Empresa,
    Vaga,
    Candidatura,
    Entrevista,
    EstatisticasEmpresa,
    Entrevistador
} from '../../models/indice_models';
import entrevista_service from '../../services/entrevista_service';

export const useDashboardEmpresaController = () => {
    const [modalAdicionarEntrevistador, setModalAdicionarEntrevistador] = useState<{
        candidaturaId: number | null;
    } | null>(null);

    const [empresa, setEmpresa] = useState<Empresa | null>(null);
    const [vagas, setVagas] = useState<Vaga[]>([]);
    const [candidaturas, setCandidaturas] = useState<Candidatura[]>([]);
    const [entrevistas, setEntrevistas] = useState<Entrevista[]>([]);
    const [estatisticas, setEstatisticas] = useState<EstatisticasEmpresa>({
        totalVagasPublicadas: 0,
        totalCandidaturasRecebidas: 0,
        totalEntrevistasAgendadas: 0,
        totalProcessoSeletivo: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedEntrevistador, setSelectedEntrevistador] = useState<number | null>(null);

    const [modalEditarVagaAberto, setModalEditarVagaAberto] = useState(false);
    const [vagaSelecionada, setVagaSelecionada] = useState<Vaga | null>(null);

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

            const dados = await EmpresaService.obterDadosDashboard();

            setEmpresa(dados.empresa);
            setVagas(dados.vagas || []);

            const todasCandidaturas = dados.vagas.flatMap((vaga: any) =>
                vaga.candidaturas.map((candidatura: any) => ({
                    ...candidatura,
                    titulo_vaga: vaga.titulo
                })) || []
            );

            setCandidaturas(todasCandidaturas);

            const todasEntrevistas = dados.entrevistas.flatMap((entrevista: any) =>
                entrevista.entrevistadores.map((entrevistador: any) => ({
                    id: entrevista.id,
                    candidatura_id: entrevista.candidatura_id,
                    data_entrevista: entrevistador.data_entrevista,
                    hora_entrevista: entrevistador.hora_entrevista,
                    local_link: entrevistador.local_link,
                    observacoes: entrevistador.observacoes,
                    status_entrevista: entrevistador.status_entrevista,
                    entrevistador: {
                        id: entrevistador.entrevistador.id,
                        nome: entrevistador.entrevistador.nome
                    }
                })) || []
            );

            setEntrevistas(todasEntrevistas);

            setEstatisticas(dados.estatisticas || {
                totalVagasPublicadas: 0,
                totalCandidaturasRecebidas: 0,
                totalEntrevistasAgendadas: 0,
                totalProcessoSeletivo: 0
            });

            const dados2 = await EntrevistadorService.getlistaEntrevistadores();
            setEntrevistadores(dados2);
        } catch (err: any) {
            setError(err.message || 'Erro ao carregar dados');
        } finally {
            setLoading(false);
        }
    };

    const [entrevistadores, setEntrevistadores] = useState<Entrevistador[]>([]);

    const handleAbrirModalEntrevistador = (candidaturaId: number) => {
        setModalAdicionarEntrevistador({ candidaturaId })
    };

    const handleFecharModal = () => {
        setModalAdicionarEntrevistador(null);
    };

    const handleAdicionarEntrevistador = async () => {
        if (selectedEntrevistador !== null) {
            console.log('Adicionar entrevistador com ID:', selectedEntrevistador);
            try {
                const ret = await EntrevistaService.adicionarEntrevistadores(
                    modalAdicionarEntrevistador.candidaturaId,
                    selectedEntrevistador
                );

                setModalAdicionarEntrevistador(null);
                setSelectedEntrevistador(null); // Limpar seleção
                window.alert('Entrevistador adicionado com sucesso!');
                await fetchDados();

                console.log('Entrevistador adicionado com sucesso:', ret);
            } catch (error) {
                console.error('Erro ao adicionar entrevistador:', error);

                // Extrair mensagem do erro
                let errorMessage = 'Erro desconhecido';
                if (error.response && error.response.data && error.response.data.error) {
                    errorMessage = error.response.data.error;
                } else if (error.message) {
                    errorMessage = error.message;
                }

                window.alert(`${errorMessage}`);
            }
        } else {
            window.alert('Por favor, selecione um entrevistador.');
        }
    };

    const handleRemoverEntrevistador = async (entrevistaId: number, entrevistadorId: number) => {
        try {
            if (window.confirm('Tem certeza que deseja excluir esta entrevista?')) {
                try {
                    const ret = await EntrevistaService.removerEntrevistadores(entrevistaId, entrevistadorId);

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

            await fetchDados();
        } catch (error) {
            console.error('Erro ao remover entrevistador:', error);
        }
    };

    const handleEditarVaga = (vaga: Vaga) => {
        setVagaSelecionada(vaga);
        setModalEditarVagaAberto(true);
    };

    const handleFecharModalEditarVaga = () => {
        setModalEditarVagaAberto(false);
        setVagaSelecionada(null);
    };

    const handleExcluirVaga = async (vagaId: number) => {
        if (window.confirm('Tem certeza que deseja excluir esta vaga')) {
            try {
                const ret = await VagaService.deleteVaga(vagaId);

                window.alert('Vaga excluida com sucesso!.');

                setVagas(vagas.filter(e => e.id !== vagaId));
            } catch (err: any) {
                console.error('Erro ao obter dados do dashboard:', error);
                if (err.response && err.response.status === 403) {
                    window.alert('Acesso negado. Verifique suas credenciais.');
                } else if (err.response && err.response.status === 400) {
                    window.alert('Vaga com entrevista agenda, cancelar entrevista.');
                }
                else {
                    window.alert('Ocorreu um erro ao carregar os dados.');
                }
            }
        }
    };

    return {
        empresa,
        vagas,
        candidaturas,
        entrevistas,
        estatisticas,
        loading,
        error,
        entrevistadores,
        modalAdicionarEntrevistador,
        handleAbrirModalEntrevistador,
        handleFecharModal,
        handleAdicionarEntrevistador,
        handleRemoverEntrevistador,
        handleEditarVaga,
        handleExcluirVaga,
        setSelectedEntrevistador,
        modalEditarVagaAberto,
        vagaSelecionada,
        handleFecharModalEditarVaga
    };
};
