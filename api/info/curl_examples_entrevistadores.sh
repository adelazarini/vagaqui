
# ========================================
# EXEMPLOS DE cURL PARA API DE ENTREVISTADORES
# ========================================

# Base URL (ajustar conforme necessário)
BASE_URL="http://localhost:3000"

# ========================================
# 1. AUTENTICAÇÃO E ACESSO
# ========================================

## 1.1 Login do entrevistador 
curl -X POST "${BASE_URL}/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "carlos.silva@techsolutions.com.br",
    "senha": "senha123"
  }'

## 1.3 Recuperar senha
curl -X POST "${BASE_URL}/auth/forgot-password" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "carlos.silva@techsolutions.com.br"
  }'

# ========================================
# 2. PERFIL DO ENTREVISTADOR
# ========================================

## 2.1 Buscar perfil próprio

curl xPost "${BASE_URL}/entrevistador" \
  -H "Content-Type: application/json" \
  -d '{
    "telefone": "(11) 98765-4321",
    "email": "ade@teste.com",
    "cargo": "Senior Developer",
  }'

curl -X GET "${BASE_URL}/entrevistador/me" \
  -H "Authorization: Bearer SEU_TOKEN_ENTREVISTADOR"

## 2.2 Atualizar perfil 
curl -X PUT "${BASE_URL}/entrevistador/me" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_ENTREVISTADOR" \
  -d '{
    "telefone": "(11) 98765-4321",
    "email": "ade@teste.com",
    "cargo": "Senior Developer",
  }'

## 2.3 Alterar senha
curl -X PATCH "${BASE_URL}/entrevistador/me/senha" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_ENTREVISTADOR" \
  -d '{
    "senha_atual": "minhaSenhaSegura456",
    "nova_senha": "novaSenhaSegura789"
  }'

# ========================================
# 8. EXEMPLOS DE RESPOSTA ESPERADA
# ========================================

## Resposta de GET /entrevistador/me
# {
#   "id": 1,
#   "nome": "Carlos Silva",
#   "email": "carlos.silva@techsolutions.com.br",
#   "cargo": "Tech Lead",
#   "usuario": {
#     "id": 15,
#     "tipo_usuario": "Entrevistador",
#     "ultimo_acesso": "2024-06-25T10:30:00Z"
#   },
# }
