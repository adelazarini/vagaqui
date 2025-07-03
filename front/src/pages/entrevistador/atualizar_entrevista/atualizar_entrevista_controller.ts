import { useState, useCallback } from 'react';
import EntrevistaService from '../../../services/entrevista_service';

interface ControllerProps {
    entrevistaId: number;
    dadosAtuais: {
        data_entrevista?: string;
        hora_entrevista?: string;
        local_link?: string;
        observacoes?: string;
        status_entrevista?: string;
    };
    onClose: () => void;
}

export const AtualizarEntrevistaController = ({
    entrevistaId,
    dadosAtuais,
    onClose
}: ControllerProps) => {
    const [dadosEntrevista, setDadosEntrevista] = useState({
        data_entrevista: dadosAtuais.data_entrevista || '',
        hora_entrevista: dadosAtuais.hora_entrevista || '',
        local_link: dadosAtuais.local_link || '',
        observacoes: dadosAtuais.observacoes || '',
        status_entrevista: dadosAtuais.status_entrevista || 'Combinar'
    });

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDadosEntrevista(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await EntrevistaService.atualizarEntrevista(entrevistaId, dadosEntrevista);
            alert('Entrevista atualizada com sucesso!');
            onClose();
            window.location.reload(); // Ou atualizar lista de entrevistas
        } catch (error) {
            console.error('Erro ao atualizar entrevista:', error);
            alert('Erro ao atualizar entrevista');
        }
    }, [entrevistaId, dadosEntrevista, onClose]);

    return {
        dadosEntrevista,
        handleInputChange,
        handleSubmit
    };
};
