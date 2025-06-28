import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HomeContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f4f6f9;
`;

export const LeftSide = styled.div`
  flex: 1;
  background-color: #3498db;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 50px;
`;

export const RightSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
`;

export const Logo = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
`;

export const Slogan = styled.p`
  font-size: 24px;
  text-align: center;
  margin-bottom: 30px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const LoginButton = styled(Link)`
  padding: 12px 24px;
  background-color: white;
  color: #3498db;
  text-decoration: none;
  border-radius: 6px;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #f0f0f0;
    transform: scale(1.05);
  }
`;

export const CadastroButton = styled(Link)`
  padding: 12px 24px;
  background-color: #2ecc71;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #27ae60;
    transform: scale(1.05);
  }
`;

export const FeaturesList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  font-size: 18px;
`;
