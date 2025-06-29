// src/pages/entrevistador/entrevistador_styles.js
import styled from 'styled-components';

export const DashboardContainer = styled.div`
    display: flex;
    min-height: 100vh;
    background-color: #f5f5f5;
`;

export const SidebarProfile = styled.aside`
    width: 300px;
    background-color: #ffffff;
    padding: 2rem;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    overflow-y: auto;

    .profile-info {
        margin-top: 2rem;
        
        h3 {
            font-size: 1.25rem;
            margin-bottom: 1rem;
            color: #333;
        }
        
        p {
            color: #666;
            font-size: 0.875rem;
            margin-bottom: 0.5rem;
        }
        
        .update-button {
            width: 100%;
            background-color: #1a2432;
            color: white;
            border: none;
            padding: 1rem;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            cursor: pointer;
            margin-top: 1rem;
            transition: all 0.3s ease;
            
            &:hover {
                background-color: #2c3e50;
                transform: translateY(-2px);
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
            }

            &:active {
                transform: translateY(1px);
                background-color: #131c26;
            }
        }
    }
`;

export const ProfileSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
    
    h2 {
        margin: 1rem 0 0.5rem;
        font-size: 1.5rem;
        color: #333;
    }
    
    p {
        color: #666;
        font-size: 0.875rem;
    }
`;

export const ProfileAvatar = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #4a90e2;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
`;

export const StatsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 2rem;
`;

export const StatCard = styled.div`
    background-color: #f8f9fa;
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
    
    h3 {
        font-size: 0.875rem;
        color: #666;
        margin-bottom: 0.5rem;
    }
    
    span {
        font-size: 1.5rem;
        font-weight: bold;
        color: #4a90e2;
    }
`;

export const MainContent = styled.main`
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
`;

export const VagasContainer = styled.section`
    background-color: #ffffff;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    h2 {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
        color: #333;
    }
`;

export const VagaItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border: 1px solid #eee;
    border-radius: 8px;
    margin-bottom: 1rem;
    transition: all 0.3s ease;
    
    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    .vaga-info {
        flex: 1;
        
        h3 {
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
            color: #333;
        }
        
        p {
            color: #666;
            margin-bottom: 0.25rem;
            font-size: 0.875rem;
        }
        
        .salario {
            font-weight: bold;
            color: #4a90e2;
            font-size: 1rem;
        }
        
        .localizacao {
            color: #999;
            font-size: 0.875rem;
        }
    }
`;

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
