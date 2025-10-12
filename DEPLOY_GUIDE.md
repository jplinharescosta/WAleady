# Deploy Guide - VPS Setup

## 🚀 Preparação para Deploy

### 1. **Build Local (Recomendado)**

```bash
# No seu ambiente local:
npm run build

# Isso cria a pasta dist/ com JavaScript compilado
# Estrutura gerada:
dist/
├── services/
│   └── core-service/
│       ├── server.js
│       ├── controllers/
│       └── routes/
├── core/
│   ├── domain/
│   └── infrastructure/
├── shared/
│   ├── config/
│   ├── logger/
│   └── middlewares/
└── types/
```

### 2. **Arquivos para VPS**

Suba apenas os arquivos necessários:

```
projeto-vps/
├── dist/                    # ✅ Código JavaScript compilado
├── package.json            # ✅ Dependências
├── package-lock.json       # ✅ Lock de versões
├── .env                    # ✅ Variáveis de ambiente
└── node_modules/           # ✅ Ou rode npm install na VPS
```

**NÃO precisa subir:**

- src/ (código TypeScript fonte)
- tsconfig.json
- TYPESCRIPT_MIGRATION.md
- .git/

### 3. **Scripts de Deploy**

#### Script Automático (deploy.sh):

```bash
#!/bin/bash
echo "🚀 Iniciando deploy..."

# Build local
npm run build

# Sync para VPS (ajuste o IP e caminho)
rsync -avz --exclude='src' --exclude='.git' --exclude='node_modules' \
  ./ user@your-vps-ip:/path/to/app/

# Conectar na VPS e instalar dependências
ssh user@your-vps-ip << 'EOF'
cd /path/to/app
npm install --production
pm2 restart whatsapp-manager || pm2 start dist/services/core-service/server.js --name whatsapp-manager
EOF

echo "✅ Deploy concluído!"
```

## 🔧 Configuração na VPS

### 1. **Instalar Node.js**

```bash
# Ubuntu/Debian:
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar versão:
node --version
npm --version
```

### 2. **Instalar PM2 (Process Manager)**

```bash
npm install -g pm2

# Iniciar aplicação:
pm2 start dist/services/core-service/server.js --name whatsapp-manager

# Configurar para reiniciar automaticamente:
pm2 startup
pm2 save
```

### 3. **Configurar Nginx (Proxy Reverso)**

```nginx
# /etc/nginx/sites-available/whatsapp-manager
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 4. **Configurar Variáveis de Ambiente**

```bash
# /path/to/app/.env
NODE_ENV=production
CORE_SERVICE_PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=whatsapp_manager
DB_USER=your_db_user
DB_PASSWORD=your_db_password
REDIS_URL=redis://localhost:6379
```

## 📊 Comparação de Abordagens

| Aspecto          | Build + Deploy            | TypeScript na VPS                        |
| ---------------- | ------------------------- | ---------------------------------------- |
| **Performance**  | ⚡ Melhor (JS nativo)     | 🐌 Mais lento (compilação em tempo real) |
| **Recursos VPS** | 💚 Menos CPU/RAM          | 🔴 Mais CPU/RAM                          |
| **Tamanho**      | 📦 Menor                  | 📦 Maior (inclui src/)                   |
| **Segurança**    | 🔒 Código fonte protegido | ⚠️ Código fonte exposto                  |
| **Debug**        | 🔍 Source maps            | 🔍 Direto no TS                          |
| **Recomendação** | ✅ **Produção**           | ⚠️ **Desenvolvimento**                   |

## 🛠 Comandos Úteis na VPS

```bash
# Verificar logs da aplicação:
pm2 logs whatsapp-manager

# Monitorar performance:
pm2 monit

# Reiniciar aplicação:
pm2 restart whatsapp-manager

# Parar aplicação:
pm2 stop whatsapp-manager

# Status de todos os processos:
pm2 status

# Verificar se aplicação está rodando:
curl http://localhost:3001/health
```

## 🔄 Workflow de Deploy Recomendado

1. **Desenvolvimento Local:**

   ```bash
   npm run dev  # TypeScript com ts-node
   ```

2. **Teste Build Local:**

   ```bash
   npm run build
   npm start    # Testar versão compilada
   ```

3. **Deploy para VPS:**

   ```bash
   # Subir apenas dist/, package.json, .env
   # Instalar dependências de produção
   npm install --production
   ```

4. **Executar na VPS:**
   ```bash
   pm2 start dist/services/core-service/server.js
   ```

## 💡 Dicas Importantes

- ✅ Use `npm install --production` na VPS (não instala devDependencies)
- ✅ Configure LOG_LEVEL=error em produção
- ✅ Use HTTPS com certificado SSL
- ✅ Configure backup automático do banco
- ✅ Monitore logs e performance
- ✅ Configure firewall (apenas portas necessárias)

## 🎯 Resultado Final

Na VPS você terá:

```
/var/www/whatsapp-manager/
├── dist/services/core-service/server.js  # ← Seu app rodando aqui
├── package.json
├── .env
└── node_modules/
```

E o PM2 executando: `node dist/services/core-service/server.js` 🚀
