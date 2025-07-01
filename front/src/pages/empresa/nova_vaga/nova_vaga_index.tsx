import React, { useState } from 'react';
import { ModalContainer, ModalContent, ModalHeader, ModalFooter, ModalBody } from '../../../components/layout/modal_styles';
import VagaInput from '../../../models/vaga_input';

interface NovaVagaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (vaga: VagaInput) => void;
}


const NovaVagaModal: React.FC<NovaVagaModalProps> = ({ isOpen, onClose, onSave }) => {
    const initialVagaState: VagaInput = {
        titulo: '',
        descricao: '',
        salario: 0,
        localizacao: '',
        tipo_contrato: '',
        nivel: ''
    };
    const [vaga, setVaga] = useState<VagaInput>(initialVagaState);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setVaga(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(vaga);
        setVaga(initialVagaState);
        onClose();
    };

    const handleCancel = () => {
        setVaga(initialVagaState);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <ModalContainer>
            <ModalContent>
                <ModalHeader>
                    <h3>Criar Nova Vaga</h3>
                    <button onClick={handleCancel}>X</button>
                </ModalHeader>
                <ModalBody>
                    <input type="text" name="titulo" placeholder="Título" value={vaga.titulo} onChange={handleChange} />
                    <textarea name="descricao" placeholder="Descrição" value={vaga.descricao} onChange={handleChange} />
                    <input type="number" name="salario" placeholder="Salário" value={vaga.salario} onChange={handleChange} />
                    <input type="text" name="localizacao" placeholder="Localização" value={vaga.localizacao} onChange={handleChange} />
                </ModalBody>
                <ModalFooter>
                    <button onClick={handleSave}>Salvar</button>
                    <button onClick={handleCancel}>Cancelar</button>
                </ModalFooter>
            </ModalContent>
        </ModalContainer>
    );
};

export default NovaVagaModal;
