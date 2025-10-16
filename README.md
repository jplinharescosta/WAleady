# 🚀 WAleady

API RESTful para gerenciamento de grupos do WhatsApp construída com Node.js, TypeScript, Express, PostgreSQL, Redis e Baileys.

## 📋 Índice

- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Status do Projeto](#-status-do-projeto)
- [Instalação](#-instalação)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Próximos Passos](#-próximos-passos)
- [Documentação Adicional](#-documentação-adicional)

## 🛠 Tecnologias

### Core

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset tipado de JavaScript
- **Express 5** - Framework web minimalista

### Banco de Dados

- **PostgreSQL** - Banco de dados relacional
- **Redis** - Cache e filas

### Qualidade de Código

- **ESLint** - Linter para JavaScript/TypeScript
- **Prettier** - Formatador de código (formata ao salvar)
- **TypeScript Strict Mode** - Verificação de tipos rigorosa

### Desenvolvimento

- **ts-node** - Execução direta de TypeScript
- **nodemon** - Hot reload durante desenvolvimento

### Segurança & Monitoramento

- **Helmet** - Segurança de headers HTTP
- **CORS** - Controle de acesso entre origens
- **express-rate-limit** - Limitação de requisições
- **Winston** - Sistema de logs

## 🏗 Arquitetura

O projeto segue os princípios de **Clean Architecture** e **SOLID**:

```
src/
├── core/                          # Camada de Domínio
│   ├── domain/
│   │   ├── entities/              # Entidades de negócio
│   │   │   └── Group.ts
│   │   ├── repositories/          # Interfaces de repositórios
│   │   │   └── interfaces.ts
│   │   └── use-cases/             # Casos de uso (regras de negócio)
│   │       ├── CreateGroupUseCase.ts
│   │       ├── UpdateGroupUseCase.ts
│   │       ├── DeleteGroupUseCase.ts
│   │       └── SendBroadcastUseCase.ts
│   └── infrastructure/            # Camada de Infraestrutura
│       └── database/
│           ├── postgres/          # Implementação PostgreSQL
│           └── redis/             # Implementação Redis
├── services/
│   └── core-service/              # Camada de Apresentação
│       ├── controllers/           # Controllers HTTP
│       ├── routes/                # Rotas da API
│       └── server.ts              # Servidor Express
├── shared/                        # Código compartilhado
│   ├── config/                    # Configurações
│   ├── logger/                    # Sistema de logs
│   └── middlewares/               # Middlewares Express
│       ├── errors/                # Tratamento de erros
│       ├── logging/               # Logging de requisições
│       └── validation/            # Validações
└── types/                         # Definições de tipos TypeScript
```

### Padrões Implementados

✅ **Repository Pattern** - Abstração de acesso a dados  
✅ **Dependency Injection** - Inversão de controle  
✅ **Use Cases** - Lógica de negócio isolada  
✅ **Custom Error Classes** - Tratamento de erros tipados  
✅ **Validation Middleware** - Validação de entrada  
✅ **Request Logging** - Logs estruturados com Winston

## 📊 Status do Projeto

### ✅ Implementado

#### Entidades

- ✅ `Group` - Entidade completa com validações

#### Use Cases

- ✅ `CreateGroupUseCase` - Criar grupos
- ✅ `DeleteGroupUseCase` - Deletar grupos
- ✅ `UpdateGroupUseCase` - Atualizar grupos (com validações avançadas)
- ✅ `SendBroadcastUseCase` - Enviar mensagens em broadcast

#### Repositórios

- ✅ `PostgresGroupRepository` - CRUD de grupos
- ✅ `RedisBroadcastRepository` - Gerenciamento de broadcasts

#### Controllers

- ✅ `GroupController` - CRUD completo de grupos
- ✅ `BroadcastController` - Envio de mensagens

#### Middlewares

- ✅ `validatePagination` - Validação de parâmetros de paginação
- ✅ `validateIdParam` - Validação de IDs
- ✅ `requestLogger` - Logging de requisições
- ✅ `sendValidationError` - Padronização de respostas de erro

#### Errors

- ✅ `ValidationError` - Erros de validação (400)
- ✅ `NotFoundError` - Recursos não encontrados (404)

#### Configurações

- ✅ TypeScript configurado com strict mode
- ✅ ESLint com boundaries plugin
- ✅ Prettier com formatação automática ao salvar
- ✅ VS Code settings configurados

### 🚧 UpdateGroupUseCase - Validações Implementadas

O `UpdateGroupUseCase` está com validações robustas:

```typescript
✅ Whitelist de campos atualizáveis
✅ Normalização de dados (trim)
✅ Validação de ID
✅ Verificação de campos obrigatórios
✅ Limites de tamanho (name: 100 chars, description: 300 chars)
✅ Verificação de existência do grupo
✅ Custom errors (ValidationError, NotFoundError)
```

## 📦 Instalação

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com suas configurações

# 3. Criar banco de dados PostgreSQL
# Execute os scripts de migração necessários

# 4. Iniciar Redis
# Certifique-se que o Redis está rodando
```

## 🎯 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Modo dev com ts-node + hot reload
npm run dev:watch        # Compilação TypeScript em modo watch
npm run dev:build        # Build + Start com hot reload

# Produção
npm run build            # Compila TypeScript para JavaScript
npm start                # Inicia servidor (requer build primeiro)

# Formatação
npx prettier --write "src/**/*.ts"   # Formata todos os arquivos TS
```

## 📁 Estrutura de Pastas

```
whatsapp-group-manager/
├── src/                           # Código-fonte TypeScript
├── dist/                          # Código compilado (gerado)
├── logs/                          # Logs da aplicação
│   └── errors/
├── scripts/                       # Scripts auxiliares
├── .vscode/                       # Configurações do VS Code
│   └── settings.json              # Format on save habilitado
├── node_modules/                  # Dependências
├── .env                           # Variáveis de ambiente (não versionado)
├── .gitignore
├── package.json
├── tsconfig.json                  # Configuração TypeScript
├── eslint.config.mjs              # Configuração ESLint
├── prettier.config.js             # Configuração Prettier
├── README.md                      # Este arquivo
├── TYPESCRIPT_MIGRATION.md        # Guia de migração JS → TS
├── TYPESCRIPT_COMPLETE_GUIDE.md   # Guia completo de TypeScript
└── DEPLOY_GUIDE.md                # Guia de deploy em VPS
```

## 🎯 Próximos Passos

### 1. Finalizar UpdateGroupUseCase no Controller

**O que fazer:**

- [ ] Atualizar `GroupController.updateGroupById()` para usar os custom errors
- [ ] Mapear `ValidationError` → HTTP 400
- [ ] Mapear `NotFoundError` → HTTP 404
- [ ] Integrar com `sendValidationError()`

**Exemplo de implementação:**

```typescript
async updateGroupById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const group = await this.updateGroupUseCase.execute(id, req.body);

    res.status(200).json({
      success: true,
      data: group.toJSON()
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return sendValidationError(res, error.issue, error.message, 400);
    }
    if (error instanceof NotFoundError) {
      return sendValidationError(res, error.issue, error.message, 404);
    }
    // Erro genérico
    console.error('Error updating group:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
```

### 2. Melhorias de Validação

- [ ] Adicionar validação de URL para `whatsappGroupInviteLink`
- [ ] Validar formato de `whatsappGroupId` se necessário
- [ ] Implementar validação de nome duplicado (se aplicável)
- [ ] Adicionar limites de `participantsCount` (max: 256 para WhatsApp)

### 3. Aplicar Padrão aos Outros Use Cases

- [ ] Revisar `CreateGroupUseCase` com custom errors
- [ ] Revisar `DeleteGroupUseCase` com custom errors
- [ ] Padronizar tratamento de erros em todos os controllers

### 4. Testes

- [ ] Configurar Jest ou Vitest
- [ ] Testes unitários para use cases
- [ ] Testes de integração para controllers
- [ ] Testes para repositórios

### 5. Documentação da API

- [ ] Adicionar Swagger/OpenAPI
- [ ] Documentar endpoints
- [ ] Exemplos de requisições/respostas

### 6. Melhorias de Infraestrutura

- [ ] Health check endpoint
- [ ] Graceful shutdown
- [ ] Docker & Docker Compose
- [ ] CI/CD pipeline

## 📚 Documentação Adicional

- **[TYPESCRIPT_MIGRATION.md](./TYPESCRIPT_MIGRATION.md)** - Histórico da migração JavaScript → TypeScript
- **[TYPESCRIPT_COMPLETE_GUIDE.md](./TYPESCRIPT_COMPLETE_GUIDE.md)** - Guia completo de TypeScript
- **[DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md)** - Como fazer deploy em VPS

## 🤝 Contribuindo

Este é um projeto educacional focado em aprender Clean Architecture, SOLID e TypeScript.

## 📝 Notas Técnicas

### TypeScript Compilation

- **Desenvolvimento**: Código TypeScript executado via `ts-node`
- **Produção**: Código compilado para CommonJS (Node.js nativo)
- **Target**: ES2020
- **Module System**: CommonJS (compilado) / ES Modules (código TypeScript)

### Prettier Configuration

- Formato automático ao salvar (CTRL+S)
- Single quotes, sem trailing commas
- 80 caracteres por linha
- 2 espaços de indentação

---

**Versão:** 1.0.0  
**Última atualização:** Outubro 2025
