import styled from 'styled-components';

export const LoginBox = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: 600;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  height: 42px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  height: 42px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  height: 42px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;

  &:hover {
    background-color: #2980b9;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const ErrorMessage = styled.p`
  color: #e74c3c;
  margin-bottom: 15px;
  text-align: center;
`;

export const LinkContainer = styled.div`
  margin-top: 15px;
  text-align: center;
`;

export const Link = styled.a`
  color: #3498db;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #2980b9;
    text-decoration: underline;
  }
`;
