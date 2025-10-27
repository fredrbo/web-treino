# Web Treino

Aplicação Angular para gerenciamento de treinos.

## 🚀 Configuração do Ambiente

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
# Configuração da API
API_URL=https://sua-api-url-aqui.com/api
```

**⚠️ IMPORTANTE:** 
- O arquivo `.env` não é commitado no Git por segurança
- Cada desenvolvedor deve criar seu próprio `.env`
- Use os templates em `src/environments/*.template.ts` como referência

### 3. Executar a aplicação
```bash
npm start
```

Este comando irá:
1. Carregar as variáveis do `.env`
2. Gerar os arquivos `environment.ts` automaticamente
3. Iniciar o servidor de desenvolvimento

## 📁 Estrutura de Ambiente

- `.env` - Variáveis de ambiente (não commitado)
- `src/environments/environment.template.ts` - Template para desenvolvimento
- `src/environments/environment.prod.template.ts` - Template para produção
- `src/environments/environment.ts` - Gerado automaticamente (não commitado)
- `src/environments/environment.prod.ts` - Gerado automaticamente (não commitado)

## 🛠 Scripts Disponíveis

- `npm start` - Desenvolvimento com hot reload
- `npm run build` - Build para produção
- `npm run set-env` - Atualiza arquivos de ambiente manualmente
- `npm run deploy` - Deploy para GitHub Pages