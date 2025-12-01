# 🛠️ Mini Marketplace de Serviços

Um sistema completo de marketplace de serviços para profissionais liberais (diaristas, pintores, manicure, eletricista, etc).  
Desenvolvido em **8 dias** com foco em modelagem, performance, UX e arquitetura limpa.  
Rodando totalmente via **Docker**, com backend em Node.js + SvelteKit no frontend.

---

## 🚀 Funcionalidades

### 👨‍🔧 Prestador
- Cadastro de prestador  
- Área administrativa para:
  - Criar serviços  
  - Adicionar variações  
  - Gerenciar agenda semanal (dias + horários)  
  - Ver contratações  
  - Ver agenda com serviços marcados  
  - Receber notificações de novas contratações  

### 👤 Cliente
- Navegação de serviços sem login  
- Cadastro / Login  
- Filtrar serviços por tipo  
- Ver detalhes do serviço (prestador, descrição, variações, fotos)  
- Escolher variação + dia + horário  
- Realizar contratação (sem pagamento, automaticamente aprovada)  

### 📅 Contratação
- Bloqueio automático de horários para evitar sobreposição  
- Duração da variação é respeitada (ex.: 1h → ocupa 1h da agenda)  
- Notificação simples para o prestador  

---

## 🧱 Arquitetura da Aplicação



/super1-marketplace
├── back-end → API Node.js (Express) + Prisma + Redis
├── front-end → SvelteKit + Vite
├── docker-compose.yml
└── README.md


---

## 🛠️ Tecnologias Utilizadas

### **Backend**
- Node.js + Express  
- Prisma ORM  
- PostgreSQL  
- Redis (cache para slots/agendamento)  
- JWT para autenticação  

### **Frontend**
- SvelteKit  
- Vite  
- TailwindCSS (se estiver usando)  

### **Infraestrutura**
- Docker  
- Docker Compose  

---

# 🐳 Como Rodar o Projeto com Docker

⚠️ **Pré-requisitos**:
- Docker
- Docker Compose

---

## 1️⃣ Subir todos os containers

```bash
docker compose up -d --build
```

Isso irá iniciar:

Serviço	Porta
Frontend (SvelteKit)	5173
Backend (Node.js)	4000
Redis	6379
Postgres	5432
2️⃣ Rodar migrations e seed

Entre no container do backend:

```bash
docker exec -it marketplace_backend sh
```

Rode as migrations:

```bash
npx prisma migrate deploy
```

Popule com dados iniciais:

```bash
npx prisma db seed
```

Pronto! 🎉

🌐 URLs da Aplicação

Sistema	URL
Frontend	http://localhost:5173

Backend API	http://localhost:4000

Postgres	localhost:5432
Redis	localhost:6379

🔧 Variáveis de Ambiente

As variáveis já estão configuradas via Docker.
Mas, caso queira rodar localmente sem docker, crie um .env no backend:

DATABASE_URL="postgresql://postgres:1234@localhost:5432/s1_market"
JWT_SECRET_KEY=sua_chave_aqui
SENHA_LOGIN=sua_senha_aqui
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
PORT=4000

📹 Vídeo da Apresentação


👉 Vídeo da Demo — YouTube

O vídeo deve mostrar:

⭐ Melhorias Futuras

Integração com WhatsApp/E-mail/Telegram

Serviço longos (vários dias)

Avaliações e comentários

Geolocalização (buscar por cidade/bairro)

Elasticsearch para autocomplete e buscas inteligentes

Chat cliente ↔ prestador dentro do sistema