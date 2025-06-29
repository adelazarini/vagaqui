// src/pages/candidato/candidato_styles.js
import styled from 'styled-components';

export const DashboardContainer = styled.div`
    display: flex;
    min-height: 100vh;
    background-color: #f5f5f5;
`;

export const SidebarContainer = styled.aside`
    width: 300px;
    background-color: #ffffff;
    padding: 2rem;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
`;

// Adicionar SidebarProfile como alias de SidebarContainer
export const SidebarProfile = styled.aside`
    width: 300px;
    background-color: #ffffff;
    padding: 2rem;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
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
    background-color: #3498db;
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

export const CandidaturaButton = styled.button`
    background-color: #3498db;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    
    &:hover {
        background-color: #3498db;
    }
    
    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

export const ProximasEntrevistasContainer = styled.div`
    background-color: #f8f9fa;
    padding: 1rem;
    border-radius: 8px;
    margin-top: 2rem;
    font-size: 0.875rem;
    
   
    .entrevista-item {
        padding: 0.75rem;
        background-color: white;
        border-radius: 4px;
        margin-bottom: 0.5rem;
        
        p {
            margin: 0.25rem 0;
            font-size: 0.875rem;
            color: #666;
            
            strong {
                color: #333;
            }
        }
    }
`;

export const UpdateProfileButton = styled.button`
    width: 100%;
    background-color: #f8f9fa;
    border: none;
    padding: 0.75rem;
    border-radius: 8px;
    font-size: 0.875rem;
    cursor: pointer;
    margin-top: 1rem;
    transition: background-color 0.3s ease;
    
    &:hover {
        background-color: #555;
    }
`;

export const ProfileInfo = styled.div`
    margin-top: 2rem;
    
    h3 {
        font-size: 1rem;
        margin-bottom: 1rem;
        color: #333;
    }
    
    p {
        font-size: 0.875rem;
        color: #666;
        margin-bottom: 0.5rem;
    }
`;
