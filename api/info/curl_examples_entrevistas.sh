# Base URL (ajustar conforme necessário)
BASE_URL="http://localhost:3000/api"

# ========================================
# 1. CRUD BÁSICO DE ENTREVISTAS
# ========================================

## 1.1 Criar nova entrevista (sem data/hora/local)
curl -X POST "${BASE_URL}/entrevista" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_EMPRESA" \
  -d '{
    "candidatura_id": 1,
    "observacoes": "Entrevista a definir"
  }'

## 1.2 Listar todas as entrevistas (com filtro opcional)
curl -X GET "${BASE_URL}/entrevista?status=Agendada" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

## 1.3 Buscar entrevista por ID
curl -X GET "${BASE_URL}/entrevista/1" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

## 1.4 Atualizar entrevista (observações e status)
curl -X PUT "${BASE_URL}/entrevista/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "observacoes": "Entrevista reagendada",
    "status": "Remarcada"
  }'

## 1.5 Deletar entrevista
curl -X DELETE "${BASE_URL}/entrevista/1" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

# ========================================
# 2. GERENCIAR ENTREVISTADORES
# ========================================

## 2.1 Listar entrevistadores de uma entrevista
curl -X GET "${BASE_URL}/entrevista/1/entrevistadores" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

## 2.2 Adicionar múltiplos entrevistadores
curl -X POST "${BASE_URL}/entrevista/1/entrevistadores" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "entrevistadores": [
      {
        "entrevistador_id": 1,
        "data_entrevista": "2024-06-25",
        "hora_entrevista": "14:00",
        "local_link": "https://meet.google.com/sala1",
        "observacoes": "Entrevista técnica com João"
      },
      {
        "entrevistador_id": 2,
        "data_entrevista": "2024-06-26",
        "hora_entrevista": "15:30",
        "local_link": "Sala de reunião A - 2º andar",
        "observacoes": "Entrevista comportamental com Maria"
      }
    ]
  }'

## 2.3 Remover um entrevistador específico
curl -X DELETE "${BASE_URL}/entrevista/1/entrevistadores/2" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

# ========================================
# 3. BUSCAR DADOS COMPLETOS
# ========================================

## 3.1 Buscar entrevista com todos os dados relacionados
curl -X GET "${BASE_URL}/entrevista/1/completa" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

## 3.2 Buscar entrevistas de uma candidatura
curl -X GET "${BASE_URL}/entrevista/candidatura/1" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

# ========================================
# 4. FILTRO AVANÇADO
# ========================================

## Filtrar entrevistas 
curl -X GET "${BASE_URL}/entrevista/filtro?status=Agendada&data_entrevista=2024-06-25" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

# ========================================
# 5. ATUALIZAR STATUS DA ENTREVISTA
# ========================================

## Atualizar status da entrevista
curl -X PATCH "${BASE_URL}/entrevista/1/status" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "novoStatus": "Concluída"
  }'
