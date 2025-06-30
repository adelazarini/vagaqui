import styled from 'styled-components';

export const FloatingButton = styled.button`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #3498db;
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 1000;

    &:hover {
        background-color: #2980b9;
        transform: scale(1.1);
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
    }

    &:active {
        transform: scale(0.95);
    }
`;