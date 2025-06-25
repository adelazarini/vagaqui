
# ========================================
# EXEMPLOS DE cURL PARA API DE CANDIDATOS
# ========================================

# Base URL (ajustar conforme necessário)
BASE_URL="http://localhost:3000"

# ========================================
# 1. AUTENTICAÇÃO E REGISTRO
# ========================================

## 1.1 Registrar novo candidato
curl -X POST "${BASE_URL}/auth/register/candidato" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao.silva@email.com",
    "senha": "senha123",
    "cpf": "123.456.789-00",
    "telefone": "(11) 98765-4321",
    "formacao": "Engenharia de Software",
    "experiencia": "5 anos de experiência em desenvolvimento web com React e Node.js. Trabalhou em projetos de e-commerce e fintechs."
  }'

## 1.2 Login do candidato
curl -X POST "${BASE_URL}/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao.silva@email.com",
    "senha": "senha123"
  }'

## 1.3 Recuperar senha
curl -X POST "${BASE_URL}/auth/forgot-password" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao.silva@email.com"
  }'

## 1.4 Resetar senha com token
curl -X POST "${BASE_URL}/auth/reset-password" \
  -H "Content-Type: application/json" \
  -d '{
    "token": "TOKEN_RECEBIDO_POR_EMAIL",
    "nova_senha": "novaSenha123"
  }'

# ========================================
# 2. CRUD DE CANDIDATOS
# ========================================

## 2.1 Buscar perfil do candidato logado
curl -X GET "${BASE_URL}/candidato/me" \
  -H "Authorization: Bearer SEU_TOKEN_CANDIDATO"

## 2.2 Buscar candidato por ID (Admin/Empresa)
curl -X GET "${BASE_URL}/candidato/1" \
  -H "Authorization: Bearer SEU_TOKEN_ADMIN"

## 2.3 Listar todos candidatos (Admin)
curl -X GET "${BASE_URL}/candidato" \
  -H "Authorization: Bearer SEU_TOKEN_ADMIN"

## 2.4 Atualizar perfil do candidato
curl -X PUT "${BASE_URL}/candidato/me" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_CANDIDATO" \
  -d '{
    "telefone": "(11) 99999-8888",
    "formacao": "Engenharia de Software - MBA em Gestão de Projetos",
    "experiencia": "6 anos de experiência em desenvolvimento web. Especialista em React, Node.js e AWS.",
    "linkedin": "https://linkedin.com/in/joaosilva",
    "github": "https://github.com/joaosilva"
  }'

## 2.5 Atualizar senha do candidato
curl -X PATCH "${BASE_URL}/candidato/me/senha" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_CANDIDATO" \
  -d '{
    "senha_atual": "senha123",
    "nova_senha": "novaSenha456"
  }'

## 2.6 Deletar conta do candidato (soft delete)
curl -X DELETE "${BASE_URL}/candidato/me" \
  -H "Authorization: Bearer SEU_TOKEN_CANDIDATO"

# ========================================
# 3. GESTÃO DE CURRÍCULO
# ========================================

## 3.1 Upload de currículo (multipart/form-data)
curl -X POST "${BASE_URL}/candidato/me/curriculo" \
  -H "Authorization: Bearer SEU_TOKEN_CANDIDATO" \
  -F "arquivo=@/path/to/curriculo.pdf" \
  -F "descricao=Currículo atualizado 2024"

## 3.2 Buscar currículo atual
curl -X GET "${BASE_URL}/candidato/me/curriculo" \
  -H "Authorization: Bearer SEU_TOKEN_CANDIDATO"

## 3.3 Listar histórico de currículos
curl -X GET "${BASE_URL}/candidato/me/curriculos" \
  -H "Authorization: Bearer SEU_TOKEN_CANDIDATO"

## 3.4 Download do currículo
curl -X GET "${BASE_URL}/candidato/me/curriculo/download" \
  -H "Authorization: Bearer SEU_TOKEN_CANDIDATO" \
  -o curriculo.pdf

## 3.5 Deletar currículo
curl -X DELETE "${BASE_URL}/candidato/me/curriculo/1" \
  -H "Authorization: Bearer SEU_TOKEN_CANDIDATO"


# ========================================
# 6. BUSCA E FILTROS (Admin/Empresa)
# ========================================

## 6.1 Buscar candidatos por palavra-chave
curl -X GET "${BASE_URL}/candidato?search=react node.js" \
  -H "Authorization: Bearer SEU_TOKEN_EMPRESA"

## 6.2 Filtrar por formação
curl -X GET "${BASE_URL}/candidato?formacao=engenharia" \
  -H "Authorization: Bearer SEU_TOKEN_EMPRESA"

## 6.3 Filtrar por experiência mínima
curl -X GET "${BASE_URL}/candidato?experiencia_min=3" \
  -H "Authorization: Bearer SEU_TOKEN_EMPRESA"

## 6.4 Busca avançada com múltiplos filtros
curl -X GET "${BASE_URL}/candidato?search=python&formacao=ciencia computacao&experiencia_min=2" \
  -H "Authorization: Bearer SEU_TOKEN_EMPRESA"

# ========================================
# 8. EXEMPLOS DE RESPOSTA ESPERADA
# ========================================

## Resposta de GET /candidato/me
# {
#   "id": 1,
#   "nome": "João Silva",
#   "email": "joao.silva@email.com",
#   "cpf": "123.456.789-00",
#   "telefone": "(11) 98765-4321",
#   "formacao": "Engenharia de Software",
#   "experiencia": "5 anos de experiência...",
#   "linkedin": "https://linkedin.com/in/joaosilva",
#   "github": "https://github.com/joaosilva",
#   "usuario": {
#     "id": 10,
#     "tipo_usuario": "Candidato",
#     "ultimo_acesso": "2024-06-25T10:30:00Z"
#   },
#   "curriculo_atual": {
#     "id": 5,
#     "url_documento": "https://storage.com/curriculos/joao-silva.pdf",
#     "data_envio": "2024-06-20"
#   },
#   "total_candidaturas": 8,
#   "candidaturas_ativas": 3
# }
# ========================================
# 9. CENÁRIOS DE ERRO
# ========================================

## CPF já cadastrado
curl -X POST "${BASE_URL}/auth/register/candidato" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Outro Candidato",
    "email": "outro@email.com",
    "cpf": "123.456.789-00",
    "senha": "senha123"
  }'
# Resposta esperada: 409 Conflict - "CPF já cadastrado"

## Candidato tentando acessar dados de outro candidato
curl -X GET "${BASE_URL}/candidato/2" \
  -H "Authorization: Bearer TOKEN_CANDIDATO_1"
# Resposta esperada: 403 Forbidden


