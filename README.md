# 🛒 Mini Marketplace de Serviços

Um marketplace completo para profissionais liberais (diarista, pintor, manicure, eletricista etc.), desenvolvido em 8 dias com foco em modelagem, performance, UX e arquitetura limpa.
A aplicação roda totalmente em Docker, com Node.js (Express) no backend e SvelteKit no frontend.

## ✨ Funcionalidades
### 👨‍🔧 Prestador

Cadastro de prestador

Painel administrativo com:

Criação de serviços

Criação de variações

Definição de agenda semanal

Visualização de contratações

Calendário com horários ocupados

Notificações de novas contratações

### 👤 Cliente

Navegação sem login

Cadastro / Login

Filtros por tipo de serviço

Página de detalhes (prestador, descrição, fotos, variações)

Seleção de variação + data + horário

Contratação (autoaprovada, sem pagamento)

### 📅 Agendamentos

Bloqueio automático de horários

Respeito à duração da variação (ex.: 1h → ocupa 1h na agenda)

Notificação para o prestador

### 🧱 Arquitetura da Aplicação
/super1-marketplace
├── back-end       → API Node.js (Express) + Prisma + Redis
├── front-end      → SvelteKit + Vite
├── docker-compose.yml
└── README.md

## 🧰 Tecnologias Utilizadas
### Backend

Node.js + Express

Prisma ORM

PostgreSQL

Redis (cache para agendamento)

JWT

### Frontend

SvelteKit

Vite

TailwindCSS (opcional)

Infra

Docker & Docker Compose

## 🐳 Como Rodar o Projeto com Docker
### 📌 Pré-requisitos

Docker

Docker Compose

### 1️⃣ Subir os containers
```bash
docker compose up -d --build
```

### 2️⃣ Rodar migrations + seed

Entre no backend:
```bash
docker exec -it marketplace_backend sh
```

Execute as migrations:
```bash
npx prisma migrate deploy
```

Execute o seed:
```bash
npm run seed
```


### 🌐 URLs
Sistema	URL
Frontend	http://localhost:5173

Backend API	http://localhost:4000

Postgres	localhost:5432
Redis	localhost:6379

### 🔧 Variáveis de Ambiente (Modo Local, sem Docker)

Crie um .env no backend:
```bash
DATABASE_URL="postgresql://postgres:1234@localhost:5432/s1_market"
JWT_SECRET_KEY=sua_chave_aqui
SENHA_LOGIN=sua_senha_aqui
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
PORT=4000
```
### 🎥 Vídeo da Apresentação

[👉 Vídeo da Demo)](https://drive.google.com/file/d/1w-ioGR9QHY_s-0r7pJBFuYU_aueugX_s/view?usp=sharing)

### ⭐ Melhorias Futuras:

Integração com WhatsApp/E-mail/Telegram

Serviços longos (vários dias)

Avaliações e comentários

Busca por geolocalização (cidade/bairro)

Elasticsearch para autocomplete e busca inteligente

Chat cliente ↔ prestador
