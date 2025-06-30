import { useState, useEffect } from 'react';
import { getCurrentUser } from '../../services/auth_service';
import EmpresaService from '../../services/empresa_service';

import {
    Empresa,
    Vaga,
    Candidatura,
    Entrevista,
    EstatisticasEmpresa
} from '../../models/indice_models';

export const useDashboardEmpresaController = () => {
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

            const todasEntrevistas = todasCandidaturas.flatMap((candidatura: any) =>
                candidatura.entrevistas || []
            );
            setEntrevistas(todasEntrevistas);

            setEstatisticas(dados.estatisticas || {
                totalVagasPublicadas: 0,
                totalCandidaturasRecebidas: 0,
                totalEntrevistasAgendadas: 0,
                totalProcessoSeletivo: 0
            });
        } catch (err: any) {
            setError(err.message || 'Erro ao carregar dados');
        } finally {
            setLoading(false);
        }
    };

    const handleNovaVaga = async () => {
        // nva vaga
    };

    return {
        empresa,
        vagas,
        candidaturas,
        entrevistas,
        estatisticas,
        loading,
        error,
        handleNovaVaga
    };
};
