
# ========================================
# EXEMPLOS DE cURL PARA API DE CURRÍCULOS
# ========================================

# Base URL (ajustar conforme necessário)
BASE_URL="http://localhost:3000"


# ========================================
# 1. GESTÃO DE CURRÍCULOS (CRUD)
# ========================================

## 2.0 Post currriculo
curl -X POST "${BASE_URL}/curriculo" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_CANDIDATO" \
  -d '{
    "url_documento": "https://drive.google.com/file/d/1234567890/view"
  }'

## 2.1 Listar currículos do candidato logado
curl -X GET "${BASE_URL}/curriculo" \
  -H "Authorization: Bearer SEU_TOKEN_CANDIDATO"

## 2.2 Buscar currículo específico por ID
curl -X GET "${BASE_URL}/curriculo/1" \
  -H "Authorization: Bearer SEU_TOKEN_CANDIDATO"

## 2.5 Deletar currículo
curl -X DELETE "${BASE_URL}/curriculo/1" \
  -H "Authorization: Bearer SEU_TOKEN_CANDIDATO"

## 2.5 atualizar url currículo
curl -X PUT "${BASE_URL}/curriculo/1" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer SEU_TOKEN_CANDIDATO" \
-d '{
  "url_documento": "https://drive.google.com/file/d/1234567890/view"
}'

# ========================================
# 5. EXEMPLOS DE RESPOSTA ESPERADA
# ========================================

## Resposta de POST /curriculo (upload)
# {
#   "id": 5,
#   "url_documento": "https://storage.vagaqui.com/curriculos/2024/06/candidato-1-1719325800.pdf",
#   "data_envio": "2024-06-25T14:30:00Z",
#   "candidato_id": 1
# }

## Resposta de GET /curriculo
# [
#   {
#     "id": 5,
#     "url_documento": "https://storage.vagaqui.com/curriculos/2024/06/candidato-1-1719325800.pdf",
#     "data_envio": "2024-06-25T14:30:00Z",
#     "candidato_id": 1
#   },
#   {
#     "id": 3,
#     "url_documento": "https://storage.vagaqui.com/curriculos/2024/05/candidato-1-1716134400.pdf",
#     "data_envio": "2024-05-15T10:00:00Z",
#     "candidato_id": 1
#   }
# ]
