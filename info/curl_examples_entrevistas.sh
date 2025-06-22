
# ========================================
# EXEMPLOS DE cURL PARA API DE ENTREVISTAS
# ========================================

# Base URL (ajustar conforme necessário)
BASE_URL="http://localhost:3000"

# ========================================
# 1. CRUD BÁSICO DE ENTREVISTAS (via baseRouter)
# ========================================

## 1.1 Criar nova entrevista
curl -X POST "${BASE_URL}/entrevistas" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "candidatura_id": 1,
    "data_entrevista": "2024-06-25",
    "hora_entrevista": "14:30",
    "local_link": "https://meet.google.com/abc-def-ghi",
    "observacoes": "Entrevista técnica - primeira fase"
  }'

## 1.2 Listar todas as entrevistas
curl -X GET "${BASE_URL}/entrevistas" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

## 1.3 Buscar entrevista por ID
curl -X GET "${BASE_URL}/entrevistas/1" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

## 1.4 Atualizar entrevista
curl -X PUT "${BASE_URL}/entrevistas/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "data_entrevista": "2024-06-26",
    "hora_entrevista": "15:00",
    "local_link": "https://meet.google.com/xyz-123-456",
    "observacoes": "Entrevista técnica - reagendada"
  }'

## 1.5 Deletar entrevista
curl -X DELETE "${BASE_URL}/entrevistas/1" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

# ========================================
# 2. GERENCIAR ENTREVISTADORES
# ========================================

## 2.1 Listar todos os entrevistadores de uma entrevista
curl -X GET "${BASE_URL}/entrevistas/1/entrevistadores" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

## 2.2 Adicionar múltiplos entrevistadores a uma entrevista
curl -X POST "${BASE_URL}/entrevistas/1/entrevistadores" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "entrevistadorIds": [1, 2, 3]
  }'

## 2.3 Adicionar um único entrevistador
curl -X POST "${BASE_URL}/entrevistas/1/entrevistadores" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "entrevistadorIds": [4]
  }'

## 2.4 Remover um entrevistador específico da entrevista
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
# 4. EXEMPLOS DE RESPOSTA ESPERADA
# ========================================

## Resposta de GET /entrevistas/1/entrevistadores
# {
#   "entrevista_id": "1",
#   "entrevistadores": [
#     {
#       "id": 1,
#       "nome": "João Silva",
#       "email": "joao@empresa.com",
#       "cargo": "Analista de RH",
#       "usuario": {
#         "id": 5,
#         "nome": "João Silva",
#         "email": "joao@empresa.com",
#         "tipo_usuario": "Entrevistador"
#       }
#     }
#   ]
# }

## Resposta de GET /entrevistas/1/completa
# {
#   "id": 1,
#   "candidatura_id": 1,
#   "data_entrevista": "2024-06-25",
#   "hora_entrevista": "14:30:00",
#   "local_link": "https://meet.google.com/abc-def-ghi",
#   "observacoes": "Entrevista técnica",
#   "entrevistadores": [
#     {
#       "id": 1,
#       "nome": "João Silva",
#       "email": "joao@empresa.com",
#       "cargo": "Analista de RH"
#     }
#   ],
#   "candidatura": {
#     "id": 1,
#     "status": "Em análise",
#     "candidato": {
#       "id": 1,
#       "nome": "Maria Santos",
#       "email": "maria@email.com",
#       "telefone": "(11) 99999-9999",
#       "formacao": "Engenharia de Software"
#     },
#     "vaga": {
#       "id": 1,
#       "titulo": "Desenvolvedor Full Stack",
#       "descricao": "Vaga para desenvolvedor...",
#       "salario": 8000.00,
#       "localizacao": "São Paulo, SP",
#       "empresa": {
#         "id": 1,
#         "nome": "Tech Corp",
#         "email": "contato@techcorp.com",
#         "cnpj": "12.345.678/0001-90"
#       }
#     }
#   }
# }

# ========================================
# 5. TESTES DE PERMISSÃO
# ========================================

## Teste com usuário Administrador (pode tudo)
curl -X POST "${BASE_URL}/entrevistas/1/entrevistadores" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN_ADMIN" \
  -d '{"entrevistadorIds": [1, 2]}'

## Teste com usuário Empresa (pode gerenciar entrevistas)
curl -X POST "${BASE_URL}/entrevistas/1/entrevistadores" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN_EMPRESA" \
  -d '{"entrevistadorIds": [3]}'

## Teste com usuário Entrevistador (só pode visualizar)
curl -X GET "${BASE_URL}/entrevistas/1/entrevistadores" \
  -H "Authorization: Bearer TOKEN_ENTREVISTADOR"

## Teste com usuário Candidato (só pode ver suas próprias entrevistas)
curl -X GET "${BASE_URL}/entrevistas/candidatura/1" \
  -H "Authorization: Bearer TOKEN_CANDIDATO"

# ========================================
# 6. CENÁRIOS DE ERRO
# ========================================

## Tentar adicionar entrevistadores sem array
curl -X POST "${BASE_URL}/entrevistas/1/entrevistadores" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "entrevistadorIds": "não é um array"
  }'
# Resposta esperada: 400 Bad Request

## Tentar acessar entrevista inexistente
curl -X GET "${BASE_URL}/entrevistas/999/entrevistadores" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
# Resposta esperada: 404 Not Found

## Tentar remover entrevistador sem permissão
curl -X DELETE "${BASE_URL}/entrevistas/1/entrevistadores/1" \
  -H "Authorization: Bearer TOKEN_SEM_PERMISSAO"
# Resposta esperada: 403 Forbidden

# ========================================
# 7. RESOLVER PROBLEMA DE CONEXÃO
# ========================================

# Para resolver o erro de conexão na porta 8432:

# Verificar serviços PostgreSQL
brew services list | grep postgres

# Verificar portas em uso
lsof -i :8432
lsof -i :5432

# Ajustar arquivo .env
echo "DB_PORT=5432" >> .env

# Reiniciar PostgreSQL
brew services restart postgresql

# Executar migrations na ordem correta
npx sequelize-cli db:migrate

# ========================================
# 8. WORKFLOW COMPLETO DE TESTE
# ========================================

# 1. Criar entrevista
ENTREVISTA_ID=$(curl -s -X POST "${BASE_URL}/entrevistas" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "candidatura_id": 1,
    "data_entrevista": "2024-06-25",
    "hora_entrevista": "14:30",
    "local_link": "https://meet.google.com/test",
    "observacoes": "Teste"
  }' | jq -r '.id')

# 2. Adicionar entrevistadores
curl -X POST "${BASE_URL}/entrevistas/${ENTREVISTA_ID}/entrevistadores" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{"entrevistadorIds": [1, 2]}'

# 3. Verificar entrevistadores adicionados
curl -X GET "${BASE_URL}/entrevistas/${ENTREVISTA_ID}/entrevistadores" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

# 4. Buscar dados completos
curl -X GET "${BASE_URL}/entrevistas/${ENTREVISTA_ID}/completa" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

# 5. Remover um entrevistador
curl -X DELETE "${BASE_URL}/entrevistas/${ENTREVISTA_ID}/entrevistadores/1" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

# 6. Verificar remoção
curl -X GET "${BASE_URL}/entrevistas/${ENTREVISTA_ID}/entrevistadores" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

echo "Todos os testes executados!"
