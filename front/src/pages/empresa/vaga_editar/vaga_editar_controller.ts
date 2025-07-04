import { useState, useCallback } from 'react';
import VagaService from '../../../services/vaga_service';
import { Vaga } from '../../../models/indice_models';

interface ControllerProps {
    vaga: Vaga;
    onClose: () => void;
}

export const AtualizarVagaController = ({
    vaga,
    onClose
}: ControllerProps) => {
    const [dadosVaga, setDadosVaga] = useState({
        titulo: vaga.titulo || '',
        descricao: vaga.descricao || '',
        salario: vaga.salario || 0,
        localizacao: vaga.localizacao || '',
    });

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDadosVaga(prev => ({
            ...prev,
            [name]: name === 'salario' ? Number(value) : value
        }));
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await VagaService.atualizarVaga(vaga.id, dadosVaga);
            alert('Vaga atualizada com sucesso!');
            onClose();
            window.location.reload();
        } catch (error) {
            console.error('Erro ao atualizar vaga:', error);
            alert('Erro ao atualizar vaga');
        }
    }, [vaga.id, dadosVaga, onClose]);

    return {
        dadosVaga,
        handleInputChange,
        handleSubmit
    };
};
