#!/bin/bash

# Base URL (ajustar conforme necessário)
BASE_URL="http://localhost:3000/auth"

# ========================================
# 1. LOGIN
# ========================================

## 1.1 Login de Candidato
curl -X POST "${BASE_URL}/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "candidato@email.com",
    "senha": "senha123"
  }'

## 1.2 Login de Empresa
curl -X POST "${BASE_URL}/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "empresa@email.com",
    "senha": "senha123"
  }'

## 1.3 Login de Entrevistador
curl -X POST "${BASE_URL}/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "entrevistador@email.com",
    "senha": "senha123"
  }'

## 1.4 Login de Admin
curl -X POST "${BASE_URL}/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@vagaqui.com",
    "senha": "admin123"
  }'

# ========================================
# 2. REGISTRO
# ========================================

## 2.1 Registro de Candidato
curl -X POST "${BASE_URL}/register" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao.silva@email.com",
    "senha": "senha123",
    "cpf": "123.456.789-00",
    "tipo_usuario": "Candidato"
  }'

## 2.2 Registro de Empresa
curl -X POST "${BASE_URL}/register" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Tech Solutions",
    "email": "contato@techsolutions.com",
    "senha": "senha123",
    "cnpj": "12.345.678/0001-90",
    "tipo_usuario": "Empresa"
  }'

## 2.3 Registro de Entrevistador
curl -X POST "${BASE_URL}/register" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Carlos Santos",
    "email": "carlos.santos@empresa.com",
    "senha": "senha123",
    "cargo": "Tech Lead",
    "empresa_id": 1,
    "tipo_usuario": "Entrevistador"
  }'

# ========================================
# 3. RECUPERAÇÃO DE SENHA
# ========================================

## 3.1 Solicitar reset de senha
curl -X POST "${BASE_URL}/forgot-password" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@email.com"
  }'

## 3.2 Resetar senha
curl -X POST "${BASE_URL}/reset-password" \
  -H "Content-Type: application/json" \
  -d '{
    "token": "token_recebido_por_email",
    "nova_senha": "novaSenha123"
  }'

# ========================================
# 4. EXEMPLOS DE RESPOSTA ESPERADA
# ========================================

## Resposta de Login
# {
#   "token": "jwt_token_aqui",
#   "usuario": {
#     "id": 1,
#     "email": "usuario@email.com",
#     "tipo_usuario": "Candidato",
#     "ultimo_login": "2024-06-25T14:30:00Z"
#   }
# }

# ========================================
# 5. LOGOUT
# ========================================

## Logout (invalidar token)
curl -X POST "${BASE_URL}/logout" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

