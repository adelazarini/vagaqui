import { useState } from 'react';
import VagaService from '../../../services/vaga_service';
import VagaInput from '../../../models/vaga_input';

export const useNovaVagaController = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const handleSaveVaga = async (vaga: VagaInput) => {
        try {
            await VagaService.criarVaga(vaga);
            alert('Vaga criada com sucesso!');
            window.location.reload();
        } catch (error) {
            console.error('Erro ao criar vaga:', error);
        }
    };

    return {
        isModalOpen,
        handleOpenModal,
        handleCloseModal,
        handleSaveVaga
    };
};
