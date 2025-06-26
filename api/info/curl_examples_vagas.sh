
# ========================================
# EXEMPLOS DE cURL PARA API DE VAGAS
# ========================================

# Base URL (ajustar conforme necessário)
BASE_URL="http://localhost:3000"

# ========================================
# 1. CRUD BÁSICO DE VAGAS
# ========================================

## 1.1 Criar nova vaga (Empresa)
curl -X POST "${BASE_URL}/vaga" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_EMPRESA" \
  -d '{
    "titulo": "Desenvolvedor Full Stack Senior",
    "descricao": "Buscamos desenvolvedor com experiência em Node.js, React e PostgreSQL. Trabalho remoto com benefícios competitivos. VR, VA, Plano de Saúde, Home Office",
    "salario": 12000.00,
    "localizacao": "Remoto - Brasil",
    "empresa_id": 1,
    "nivel": "Senior"
  }'

## 1.2 Listar todas as vagas (público)
curl -X GET "${BASE_URL}/vagas"

## 1.3 Listar vagas com paginação
curl -X GET "${BASE_URL}/vagas?page=1&limit=10"

## 1.4 Buscar vaga por ID
curl -X GET "${BASE_URL}/vagas/1"

## 1.5 Atualizar vaga (Empresa dona)
curl -X PUT "${BASE_URL}/vagas/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_EMPRESA" \
  -d '{
    "titulo": "Desenvolvedor Full Stack Senior - URGENTE",
    "salario": 15000.00,
    "descricao": "Vaga com início imediato. Buscamos desenvolvedor com experiência em Node.js, React e PostgreSQL."
  }'

## 1.6 Deletar vaga (soft delete)
curl -X DELETE "${BASE_URL}/vagas/1" \
  -H "Authorization: Bearer SEU_TOKEN_EMPRESA"

# ========================================
# 2. FILTROS E BUSCAS AVANÇADAS
# ========================================

## 2.1 Buscar vagas por palavra-chave
curl -X GET "${BASE_URL}/vagas?search=desenvolvedor"

## 2.2 Filtrar por localização
curl -X GET "${BASE_URL}/vagas?localizacao=São Paulo"

## 2.3 Filtrar por faixa salarial
curl -X GET "${BASE_URL}/vagas?salario_min=5000&salario_max=10000"

## 2.4 Filtrar por múltiplos critérios
curl -X GET "${BASE_URL}/vagas?search=full stack&localizacao=Remoto&salario_min=8000"

## 2.5 Filtrar por empresa
curl -X GET "${BASE_URL}/vagas?empresa_id=1"

## 2.6 Ordenar resultados
curl -X GET "${BASE_URL}/vagas?order_by=salario&order=DESC"

## 2.7 Buscar vagas publicadas em período específico
curl -X GET "${BASE_URL}/vagas?data_inicio=2024-06-01&data_fim=2024-06-30"

# ========================================
# 3. ROTAS ESPECÍFICAS DE VAGA
# ========================================

## 3.1 Listar vagas de uma empresa específica
curl -X GET "${BASE_URL}/vagas/empresa/1" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

## 3.2 Buscar vaga com dados completos (incluindo empresa)
curl -X GET "${BASE_URL}/vagas/1/completa"

## 3.3 Listar candidaturas de uma vaga (Empresa)
curl -X GET "${BASE_URL}/vagas/1/candidaturas" \
  -H "Authorization: Bearer SEU_TOKEN_EMPRESA"

## 3.4 Ativar/Desativar vaga
curl -X PATCH "${BASE_URL}/vagas/1/status" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_EMPRESA" \
  -d '{
    "ativo": false
  }'

# ========================================
# 4. EXEMPLOS DE RESPOSTA ESPERADA
# ========================================

## Resposta de GET /vagas/1/completa
# {
#   "id": 1,
#   "titulo": "Desenvolvedor Full Stack Senior",
#   "descricao": "Buscamos desenvolvedor com experiência...",
#   "salario": 12000.00,
#   "localizacao": "São Paulo, SP",
#   "data_publicacao": "2024-06-20",
#   "requisitos": "5+ anos de experiência",
#   "beneficios": "VR, VA, Plano de Saúde",
#   "tipo_contrato": "CLT",
#   "nivel": "Senior",
#   "ativo": true,
#   "empresa": {
#     "id": 1,
#     "nome": "Tech Corp",
#     "email": "contato@techcorp.com",
#     "cnpj": "12.345.678/0001-90",
#     "telefone": "(11) 3333-4444",
#     "descricao": "Empresa líder em tecnologia",
#     "logo_url": "https://storage.com/logos/techcorp.png"
#   },
#   "total_candidaturas": 45,
#   "candidaturas_em_analise": 20
# }


## Resposta de GET /vagas com filtros
# {
#   "data": [
#     {
#       "id": 1,
#       "titulo": "Desenvolvedor Full Stack",
#       "empresa": "Tech Corp",
#       "localizacao": "São Paulo, SP",
#       "salario": 12000.00,
#       "data_publicacao": "2024-06-20"
#     },
#     {
#       "id": 2,
#       "titulo": "Desenvolvedor Backend",
#       "empresa": "Digital Solutions",
#       "localizacao": "Remoto",
#       "salario": 10000.00,
#       "data_publicacao": "2024-06-19"
#     }
#   ],
#   "pagination": {
#     "total": 25,
#     "page": 1,
#     "limit": 10,
#     "pages": 3
#   }
# }

# ========================================
# 6. TESTES DE PERMISSÃO
# ========================================

## Empresa tentando editar vaga de outra empresa (deve falhar)
curl -X PUT "${BASE_URL}/vagas/5" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN_EMPRESA_1" \
  -d '{
    "titulo": "Tentando editar vaga alheia"
  }'
# Resposta esperada: 403 Forbidden

## Candidato tentando criar vaga (deve falhar)
curl -X POST "${BASE_URL}/vagas" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN_CANDIDATO" \
  -d '{
    "titulo": "Nova vaga"
  }'
# Resposta esperada: 403 Forbidden

## Acesso público a vaga (deve funcionar)
curl -X GET "${BASE_URL}/vagas/1"
# Resposta esperada: 200 OK

# ========================================
# 7. CENÁRIOS DE ERRO
# ========================================

## Criar vaga sem campos obrigatórios
curl -X POST "${BASE_URL}/vagas" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN_EMPRESA" \
  -d '{
    "titulo": "Apenas título"
  }'
# Resposta esperada: 400 Bad Request

## Buscar vaga inexistente
curl -X GET "${BASE_URL}/vagas/999"
# Resposta esperada: 404 Not Found

## Filtro com parâmetros inválidos
curl -X GET "${BASE_URL}/vagas?salario_min=abc"
# Resposta esperada: 400 Bad Request
