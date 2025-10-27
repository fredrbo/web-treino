const fs = require('fs');
const dotenv = require('dotenv');

// Verifica se o .env existe
if (!fs.existsSync('.env')) {
  console.log('❌ Arquivo .env não encontrado!');
  console.log('📝 Crie um arquivo .env com: API_URL=sua-url-aqui');
  process.exit(1);
}

// Carrega as variáveis do .env
const envConfig = dotenv.parse(fs.readFileSync('.env'));

if (!envConfig.API_URL) {
  console.log('❌ Variável API_URL não encontrada no .env!');
  console.log('📝 Adicione no .env: API_URL=sua-url-aqui');
  process.exit(1);
}

// Cria o conteúdo do arquivo environment.ts (desenvolvimento)
const environmentContent = `export const environment = {
  production: false,
  apiUrl: '${envConfig.API_URL}'
};
`;

// Cria o conteúdo do arquivo environment.prod.ts (produção)
const environmentProdContent = `export const environment = {
  production: true,
  apiUrl: '${envConfig.API_URL}'
};
`;

// Escreve os arquivos
fs.writeFileSync('./src/environments/environment.ts', environmentContent);
fs.writeFileSync('./src/environments/environment.prod.ts', environmentProdContent);

console.log('✅ Environment files updated with .env variables');
console.log('🔗 API_URL:', envConfig.API_URL);