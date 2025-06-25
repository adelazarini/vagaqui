# Base URL (ajustar conforme necessário)
BASE_URL="http://localhost:3000"

# ========================================
# 1. CRUD BÁSICO DE ENTREVISTAS (via baseRouter)
# ========================================

## 1.1 Criar nova entrevista (não envie data/hora/local aqui)
curl -X POST "${BASE_URL}/entrevistas" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "candidatura_id": 1,
    "observacoes": "Entrevista técnica - primeira fase"
  }'

## 1.2 Listar todas as entrevistas (com filtro se desejar)
curl -X GET "${BASE_URL}/entrevistas" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

## 1.3 Buscar entrevista por ID
curl -X GET "${BASE_URL}/entrevistas/1" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

## 1.4 Atualizar entrevista (apenas observações)
curl -X PUT "${BASE_URL}/entrevistas/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "observacoes": "Entrevista reagendada"
  }'

## 1.5 Deletar entrevista
curl -X DELETE "${BASE_URL}/entrevistas/1" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

# ========================================
# 2. GERENCIAR ENTREVISTADORES (dados individuais)
# ========================================

## 2.1 Listar todos os entrevistadores de uma entrevista
curl -X GET "${BASE_URL}/entrevistas/1/entrevistadores" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

## 2.2 Adicionar múltiplos entrevistadores com dados individuais
curl -X POST "${BASE_URL}/entrevistas/1/entrevistadores" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "entrevistadores": [
      {
        "entrevistador_id": 1,
        "data_entrevista": "2024-06-25",
        "hora_entrevista": "14:00",
        "local_link": "https://meet.google.com/sala1",
        "observacoes_individuais": "Entrevista técnica com João"
      },
      {
        "entrevistador_id": 2,
        "data_entrevista": "2024-06-26",
        "hora_entrevista": "15:30",
        "local_link": "Sala de reunião A - 2º andar",
        "observacoes_individuais": "Entrevista comportamental com Maria"
      }
    ]
  }'

## 2.3 Remover um entrevistador específico da entrevista
curl -X DELETE "${BASE_URL}/entrevistas/1/entrevistadores/2" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

# ========================================
# 3. BUSCAR DADOS COMPLETOS
# ========================================

## 3.1 Buscar entrevista com todos os dados relacionados
curl -X GET "${BASE_URL}/entrevistas/1/completa" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

## 3.2 Buscar todas as entrevistas de uma candidatura específica
curl -X GET "${BASE_URL}/entrevistas/candidatura/1" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

# ========================================
# 4. FILTRO AVANÇADO (usando query string)
# ========================================

## Filtrar entrevistas por entrevistador, data, hora etc
curl -X GET "${BASE_URL}/entrevistas/filtro?entrevistador_id=2&data_entrevista=2024-06-25" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

# ========================================
# 5. TESTES DE PERMISSÃO E ERROS
# ========================================

## Exemplo: tentar adicionar entrevistadores sem array
curl -X POST "${BASE_URL}/entrevistas/1/entrevistadores" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "entrevistadores": "não é um array"
  }'
# Resposta esperada: 400 Bad Request

## Exemplo: acessar entrevista inexistente
curl -X GET "${BASE_URL}/entrevistas/999/entrevistadores" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
# Resposta esperada: 404 Not Found

