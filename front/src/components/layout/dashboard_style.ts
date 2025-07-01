import styled from 'styled-components';

export const ButtonContainer = styled.div`
    display: flex;
    gap: 0.5rem;
`;

export const EditButton = styled.button`
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        background-color: #45a049;
        transform: translateY(-1px);
    }
`;

export const DeleteButton = styled.button`
    background-color: #f44336;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        background-color: #da190b;
        transform: translateY(-1px);
    }
`;