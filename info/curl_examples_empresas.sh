
# ========================================
# EXEMPLOS DE cURL PARA API DE EMPRESAS
# ========================================

# Base URL (ajustar conforme necessário)
BASE_URL="http://localhost:3000"

# ========================================
# 1. AUTENTICAÇÃO E REGISTRO
# ========================================

## 1.1 Registrar nova empresa
curl -X POST "${BASE_URL}/auth/register/empresa" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Tech Solutions Ltda",
    "email": "contato@techsolutions.com.br",
    "senha": "senha123",
    "cnpj": "12.345.678/0001-90",
    "telefone": "(11) 3333-4444",
    "endereco": "Av. Paulista, 1000 - São Paulo, SP",
    "descricao": "Empresa especializada em desenvolvimento de software",
    "website": "https://techsolutions.com.br"
  }'

## 1.2 Login da empresa
curl -X POST "${BASE_URL}/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "contato@techsolutions.com.br",
    "senha": "senha123"
  }'

## 1.3 Recuperar senha
curl -X POST "${BASE_URL}/auth/forgot-password" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "contato@techsolutions.com.br"
  }'

# ========================================
# 2. CRUD DE EMPRESAS
# ========================================

## 2.1 Buscar perfil da empresa logada
curl -X GET "${BASE_URL}/empresa/me" \
  -H "Authorization: Bearer SEU_TOKEN_EMPRESA"

## 2.2 Buscar empresa por ID (público)
curl -X GET "${BASE_URL}/empresa/1"

## 2.3 Listar todas empresas (público com paginação)
curl -X GET "${BASE_URL}/empresa?page=1&limit=10"

## 2.4 Atualizar perfil da empresa
curl -X PUT "${BASE_URL}/empresa/me" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_EMPRESA" \
  -d '{
    "telefone": "(11) 3333-5555",
    "descricao": "Empresa líder em desenvolvimento de software e consultoria em TI",
    "website": "https://techsolutions.com.br",
    "linkedin": "https://linkedin.com/company/techsolutions",
    "logo_url": "https://storage.com/logos/techsolutions.png",
    "numero_funcionarios": "50-100",
    "ano_fundacao": 2015
  }'

## 2.5 Atualizar senha da empresa
curl -X PATCH "${BASE_URL}/empresa/me/senha" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_EMPRESA" \
  -d '{
    "senha_atual": "senha123",
    "nova_senha": "novaSenha456"
  }'

# ========================================
# 8. EXEMPLOS DE RESPOSTA ESPERADA
# ========================================

## Resposta de GET /empresa/me
# {
#   "id": 1,
#   "nome": "Tech Solutions Ltda",
#   "email": "contato@techsolutions.com.br",
#   "cnpj": "12.345.678/0001-90",
#   "telefone": "(11) 3333-4444",
#   "endereco": "Av. Paulista, 1000 - São Paulo, SP",
#   "descricao": "Empresa especializada em desenvolvimento de software",
#   "website": "https://techsolutions.com.br",
#   "logo_url": "https://storage.com/logos/techsolutions.png",
#   "numero_funcionarios": "50-100",
#   "ano_fundacao": 2015,
#   "usuario": {
#     "id": 5,
#     "tipo_usuario": "Empresa",
#     "ultimo_acesso": "2024-06-25T10:30:00Z"
#   },
#   "estatisticas": {
#     "total_vagas": 15,
#     "vagas_ativas": 8,
#     "total_candidaturas": 234,
#     "entrevistas_agendadas": 12
#   }
# }

# ========================================
# 9. CENÁRIOS DE ERRO
# ========================================

## CNPJ já cadastrado
curl -X POST "${BASE_URL}/empresa" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Outra Empresa",
    "cnpj": "12.345.678/0001-90",
    "email": "outra@empresa.com",
    "senha": "senha123"
  }'
# Resposta esperada: 409 Conflict - "CNPJ já cadastrado"

## Empresa tentando acessar dados de outra empresa
curl -X GET "${BASE_URL}/empresa/2/vagas" \
  -H "Authorization: Bearer TOKEN_EMPRESA_1"
# Resposta esperada: 403 Forbidden

## Criar vaga sem campos obrigatórios
curl -X POST "${BASE_URL}/empresa/me/vagas" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_EMPRESA" \
  -d '{
    "titulo": "Apenas título"
  }'
# Resposta esperada: 400 Bad Request
