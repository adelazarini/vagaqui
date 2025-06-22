
# ========================================
# EXEMPLOS DE cURL PARA API DE CANDIDATURAS
# ========================================

# Base URL (ajustar conforme necessário)
BASE_URL="http://localhost:3000"

# ========================================
# 1. CRUD BÁSICO DE CANDIDATURAS
# ========================================

## 1.1 Criar nova candidatura
curl -X POST "${BASE_URL}/candidaturas" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_CANDIDATO" \
  -d '{
    "vaga_id": 1,
    "candidato_id": 1,
    "status": "Em análise",
    "curriculo_id": 1
  }'

## 1.2 Listar todas as candidaturas (Admin/Empresa)
curl -X GET "${BASE_URL}/candidaturas" \
  -H "Authorization: Bearer SEU_TOKEN_ADMIN"

## 1.3 Buscar candidatura por ID
curl -X GET "${BASE_URL}/candidaturas/1" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

## 1.4 Atualizar status da candidatura
curl -X PUT "${BASE_URL}/candidaturas/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_EMPRESA" \
  -d '{
    "status": "Aprovado"
  }'

## 1.5 Deletar candidatura
curl -X DELETE "${BASE_URL}/candidaturas/1" \
  -H "Authorization: Bearer SEU_TOKEN_ADMIN"

# ========================================
# 2. ROTAS ESPECÍFICAS DE CANDIDATURA
# ========================================

## 2.1 Listar candidaturas de um candidato específico
curl -X GET "${BASE_URL}/candidaturas/candidato/1" \
  -H "Authorization: Bearer SEU_TOKEN_CANDIDATO"

## 2.2 Listar candidaturas para uma vaga específica
curl -X GET "${BASE_URL}/candidaturas/vaga/1" \
  -H "Authorization: Bearer SEU_TOKEN_EMPRESA"

## 2.3 Buscar candidatura com dados completos
curl -X GET "${BASE_URL}/candidaturas/1/completa" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

## 2.4 Atualizar status da candidatura (fluxo de aprovação)
curl -X PATCH "${BASE_URL}/candidaturas/1/status" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_EMPRESA" \
  -d '{
    "status": "Entrevista agendada"
  }'

# ========================================
# 3. FILTROS E BUSCAS AVANÇADAS
# ========================================

## 3.1 Filtrar candidaturas por status
curl -X GET "${BASE_URL}/candidaturas?status=Em análise" \
  -H "Authorization: Bearer SEU_TOKEN_EMPRESA"

## 3.2 Filtrar candidaturas por data
curl -X GET "${BASE_URL}/candidaturas?data_inicio=2024-06-01&data_fim=2024-06-30" \
  -H "Authorization: Bearer SEU_TOKEN_EMPRESA"

## 3.3 Buscar candidaturas com filtros múltiplos
curl -X GET "${BASE_URL}/candidaturas?vaga_id=1&status=Aprovado" \
  -H "Authorization: Bearer SEU_TOKEN_EMPRESA"

# ========================================
# 4. ESTATÍSTICAS E RELATÓRIOS
# ========================================

## 4.1 Obter estatísticas de candidaturas por vaga
curl -X GET "${BASE_URL}/candidaturas/estatisticas/vaga/1" \
  -H "Authorization: Bearer SEU_TOKEN_EMPRESA"

## 4.2 Obter resumo de candidaturas do candidato
curl -X GET "${BASE_URL}/candidaturas/resumo/candidato/1" \
  -H "Authorization: Bearer SEU_TOKEN_CANDIDATO"

# ========================================
# 5. EXEMPLOS DE RESPOSTA ESPERADA
# ========================================

## Resposta de GET /candidaturas/1/completa
# {
#   "id": 1,
#   "vaga_id": 1,
#   "candidato_id": 1,
#   "curriculo_id": 1,
#   "status": "Em análise",
#   "data_candidatura": "2024-06-25",
#   "candidato": {
#     "id": 1,
#     "nome": "Maria Santos",
#     "email": "maria@email.com",
#     "cpf": "123.456.789-00",
#     "telefone": "(11) 99999-9999",
#     "formacao": "Engenharia de Software"
#   },
#   "vaga": {
#     "id": 1,
#     "titulo": "Desenvolvedor Full Stack",
#     "descricao": "Vaga para desenvolvedor...",
#     "salario": 8000.00,
#     "localizacao": "São Paulo, SP",
#     "empresa": {
#       "id": 1,
#       "nome": "Tech Corp",
#       "email": "contato@techcorp.com",
#       "cnpj": "12.345.678/0001-90"
#     }
#   },
#   "curriculo": {
#     "id": 1,
#     "url_documento": "https://storage.com/curriculos/maria-santos.pdf",
#     "data_envio": "2024-06-20"
#   },
#   "entrevistas": [
#     {
#       "id": 1,
#       "data_entrevista": "2024-06-28",
#       "hora_entrevista": "14:00",
#       "local_link": "https://meet.google.com/abc-def-ghi",
#       "entrevistadores": [
#         {
#           "id": 1,
#           "nome": "João Silva",
#           "cargo": "Analista de RH"
#         }
#       ]
#     }
#   ]
# }

# ========================================
# 6. TESTES DE PERMISSÃO
# ========================================

## Candidato tentando ver candidaturas de outros candidatos (deve falhar)
curl -X GET "${BASE_URL}/candidaturas/candidato/2" \
  -H "Authorization: Bearer TOKEN_CANDIDATO_1"
# Resposta esperada: 403 Forbidden

## Empresa tentando ver candidaturas de vagas de outra empresa (deve falhar)
curl -X GET "${BASE_URL}/candidaturas/vaga/5" \
  -H "Authorization: Bearer TOKEN_EMPRESA_1"
# Resposta esperada: 403 Forbidden

## Candidato criando candidatura para vaga já candidatada (deve falhar)
curl -X POST "${BASE_URL}/candidaturas" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN_CANDIDATO" \
  -d '{
    "vaga_id": 1,
    "candidato_id": 1
  }'
# Resposta esperada: 400 Bad Request - "Candidatura já existe"

# ========================================
# 7. CENÁRIOS DE ERRO
# ========================================

## Criar candidatura sem vaga_id
curl -X POST "${BASE_URL}/candidaturas" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_CANDIDATO" \
  -d '{
    "candidato_id": 1
  }'
# Resposta esperada: 400 Bad Request

## Atualizar status inválido
curl -X PUT "${BASE_URL}/candidaturas/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_EMPRESA" \
  -d '{
    "status": "Status Inválido"
  }'
# Resposta esperada: 400 Bad Request


# ========================================
# 8. ESTADOS POSSÍVEIS DA CANDIDATURA
# ========================================

# Estados típicos:
# - "Pendente" (inicial)
# - "Em análise"
# - "Entrevista agendada"
# - "Em processo seletivo"
# - "Aprovado"
# - "Rejeitado"
# - "Desistência"

# Fluxo de mudança de status:
# Pendente → Em análise → Entrevista agendada → Em processo seletivo → Aprovado/Rejeitado
