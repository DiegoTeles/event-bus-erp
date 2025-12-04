# Frontend - Portal Interno

Frontend do Portal Interno para gestão de pedidos de insumos.

## Tecnologias

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Styled Components** - Estilização
- **Axios** - Cliente HTTP

## Como Rodar

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

O frontend estará disponível em `http://localhost:3001`

### Build de Produção

```bash
npm run build
npm start
```

## Configuração

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Estrutura do Projeto

```
frontend/
├── app/                    # Páginas Next.js (App Router)
│   ├── login/             # Tela de login
│   ├── orders/            # Tela de gestão de orders
│   └── layout.tsx          # Layout raiz com AuthProvider
├── src/
│   ├── components/        # Componentes reutilizáveis
│   │   └── ProtectedRoute.tsx
│   ├── contexts/          # Contexts React
│   │   └── AuthContext.tsx
│   └── services/          # Serviços de API
│       └── api.ts
└── public/                # Arquivos estáticos
```

## Funcionalidades

### 1. Autenticação
- Login simplificado (apenas username)
- Token armazenado no localStorage
- Proteção de rotas automática
- Redirecionamento para login se não autenticado

### 2. Criação de Pedidos
- Formulário com validação
- Seleção de branch (piloto ou legado)
- Validação de quantidade > 0
- Feedback visual de sucesso/erro

### 3. Listagem de Pedidos
- Lista todos os pedidos criados
- Exibe status (CREATED, SENT_TO_ERP, REJECTED)
- Mostra detalhes: branchId, itemId, quantity, data
- Atualização automática após criar novo pedido

## Integração com Backend

O frontend se comunica com o backend através do serviço `api.ts`:

- **Autenticação**: `POST /api/auth/login`
- **Criar Order**: `POST /api/orders`
- **Listar Orders**: `GET /api/orders`
- **Buscar Order**: `GET /api/orders/:id`

Todas as requisições incluem automaticamente o token de autenticação no header `Authorization: Bearer <token>`.

## Requisitos do Teste Técnico

✅ **Tela de Login**: Implementada com formulário simplificado  
✅ **Tela de criação de Order**: Formulário com branchId, itemId, quantity  
✅ **Tela de listagem**: Lista orders com status e detalhes  
✅ **Integração com Auth**: Token enviado em todas as requisições  
✅ **Validação frontend**: Campos obrigatórios e quantity > 0  
✅ **Redirecionamento**: Proteção de rotas e redirect para login
