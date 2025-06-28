// src/pages/Candidato/Dashboard/styles.js
import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f6f9;
  min-height: 100vh;
`;

export const SidebarContainer = styled.div`
  width: 300px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-right: 20px;
`;

export const MainContent = styled.div`
  flex-grow: 1;
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  text-align: center;
`;

export const ProfileAvatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #3498db;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: bold;
`;

export const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const StatCard = styled.div`
  background-color: #f0f4f8;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  flex-grow: 1;
  margin: 0 10px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  h3 {
    margin-bottom: 10px;
    color: #2c3e50;
    font-size: 14px;
  }

  p {
    font-size: 18px;
    font-weight: bold;
    color: #3498db;
  }
`;

export const VagasContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 15px;
`;

export const VagaItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #e9ecef;

  &:last-child {
    border-bottom: none;
  }

  h3 {
    margin-bottom: 5px;
    color: #2c3e50;
  }

  p {
    color: #7f8c8d;
    margin-bottom: 5px;
  }
`;

export const CandidaturaButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

export const ProfileInfo = styled.div`
  margin-top: 20px;
  
  p {
    margin-bottom: 10px;
    color: #2c3e50;
  }
`;

export const UpdateProfileButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #27ae60;
  }
`;

export const ProximasEntrevistasContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 15px;
`;

export const EntrevistaItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e9ecef;

  &:last-child {
    border-bottom: none;
  }
`;
