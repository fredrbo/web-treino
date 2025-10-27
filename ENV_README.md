# Web Treino - Configuração de Ambiente

## Configuração Local

1. **Copie o arquivo de exemplo:**
   ```bash
   cp .env.example .env
   ```

2. **Configure suas variáveis:**
   ```bash
   # .env
   API_URL=https://sua-api-real.com/api
   ```

## Configuração para Produção

### GitHub Pages
Para deploy no GitHub Pages, configure as variáveis de ambiente:

1. Vá em **Settings > Secrets and variables > Actions**
2. Adicione as seguintes variáveis:
   - `API_URL`: URL da sua API de produção

### Outros Ambientes
Configure as variáveis de ambiente no seu provedor:

```bash
# Variáveis necessárias
API_URL=https://sua-api-de-producao.com/api
```

## Desenvolvimento

Durante o desenvolvimento, a aplicação usará as configurações do arquivo `.env` local.

**Importante:** Nunca commite o arquivo `.env` com dados sensíveis!

## Scripts Disponíveis

```bash
# Desenvolvimento
npm start

# Build de produção
npm run build:prod

# Deploy para GitHub Pages
npm run deploy
```