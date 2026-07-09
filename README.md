# Health Ledger

> A production-ready full-stack application for personal food logging, calorie analytics, and health insights.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Local Development](#local-development)
- [Docker Setup](#docker-setup)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [Architecture](#architecture)
- [Testing](#testing)
- [Scripts Reference](#scripts-reference)
- [Future Expansion](#future-expansion)

---

## Overview

Health Ledger is an MVP for tracking food intake and understanding calorie patterns. It covers:

- **JWT Authentication** — register, login, logout, profile
- **Food Logging** — full CRUD with search, filter, sort, tags, and optional image uploads
- **Analytics** — daily/weekly/monthly calorie charts, meal distribution, lowest-calorie summaries
- **Swagger Docs** — interactive API explorer at `/api/docs`
- **Docker** — one-command setup with Compose

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, TypeScript, Tailwind CSS, React Router v6 |
| UI Utilities | React Hook Form, Zod, Axios, Recharts, Lucide React |
| Backend | Node.js, Express, TypeScript |
| Auth | JSON Web Tokens (JWT), bcryptjs |
| ORM | Prisma 5 |
| Database | PostgreSQL |
| Validation | express-validator |
| File Uploads | Multer |
| API Docs | Swagger (swagger-jsdoc + swagger-ui-express) |
| Security | Helmet, express-rate-limit, CORS |
| DevOps | Docker, Docker Compose |
| Linting | ESLint, Prettier |
| Testing | Jest + Supertest (backend), Vitest + Testing Library (frontend) |

---

## Project Structure

```
health-ledger/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma        # Database schema
│   │   └── seed.ts              # Sample data seeder
│   └── src/
│       ├── controllers/         # HTTP request handlers
│       ├── services/            # Business logic (auth, food logs, analytics)
│       ├── routes/              # Route declarations
│       ├── middleware/          # Auth, validation, upload, error handling
│       ├── config/              # App configuration
│       ├── validators/          # Request validation rules
│       ├── utils/               # Shared utilities
│       ├── types/               # TypeScript type definitions
│       ├── __tests__/           # Backend test suites
│       ├── app.ts               # Express app setup
│       └── server.ts            # Entry point
├── frontend/
│   └── src/
│       ├── pages/               # Route-level page components
│       ├── components/          # Reusable UI components and forms
│       ├── services/            # Axios API clients
│       ├── routes/              # Protected routing
│       └── hooks/               # Reusable React hooks
├── docs/                        # Supplementary SDLC documentation
├── docker-compose.yml
└── README.md
```

---

## Prerequisites

Make sure the following are installed on your machine:

| Tool | Minimum Version | Download |
|---|---|---|
| Node.js | v18.x | https://nodejs.org |
| npm | v9.x | Comes with Node |
| PostgreSQL | v14.x | https://www.postgresql.org/download |
| Git | any | https://git-scm.com |
| Docker *(optional)* | v24.x | https://www.docker.com |

---

## Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/health-ledger.git
cd health-ledger
```

### 2. Start PostgreSQL

Ensure your PostgreSQL database server is running:

- **Windows:**
  Start directly using the data directory:
  ```powershell
  pg_ctl -D "C:\Program Files\PostgreSQL\18\data" start
  ```
  *(Or register it as a Windows Service in an Admin terminal with `pg_ctl register -N "postgresql-x64-18" -D "C:\Program Files\PostgreSQL\18\data"` and start it with `net start postgresql-x64-18`)*
- **macOS:**
  ```bash
  brew services start postgresql
  ```
- **Linux:**
  ```bash
  sudo systemctl start postgresql
  ```

### 3. Create a PostgreSQL Database

Open `psql` or pgAdmin and run:

```sql
CREATE DATABASE health_ledger;
```

### 4. Configure Environment Variables

```bash
# Windows (PowerShell)
Copy-Item backend\.env.example backend\.env
Copy-Item frontend\.env.example frontend\.env
```

Open `backend/.env` and update your database credentials (see [Environment Variables](#environment-variables)).

### 5. Set Up and Start the Backend

```bash
cd backend
npm install
npm run prisma:generate   # Generate Prisma client
npm run prisma:migrate    # Run database migrations
npm run prisma:seed       # Load sample data (optional)
npm run dev               # Start backend on http://localhost:4000
```

### 6. Start the Frontend

Open a **new terminal**:

```bash
cd frontend
npm install
npm run dev               # Start frontend on http://localhost:5173
```

### 7. Open in Browser

| Service | URL |
|---|---|
| Frontend App | http://localhost:5173 |
| Backend API | http://localhost:4000 |
| Swagger Docs | http://localhost:4000/api/docs |

---

## Docker Setup

Ensure Docker Desktop is running, then from the project root:

```bash
docker compose up --build
```

The Compose stack starts `postgres`, `backend`, and `frontend` together. To seed sample data on first run:

```bash
docker compose exec backend npx prisma db seed
```

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:password@localhost:5432/health_ledger?schema=public` |
| `JWT_SECRET` | Secret key for signing JWTs | `a-long-random-secret-string` |
| `JWT_EXPIRES_IN` | Token lifetime | `1d` |
| `PORT` | API server port | `4000` |
| `FRONTEND_URL` | Allowed CORS origin | `http://localhost:5173` |
| `UPLOAD_DIR` | Directory for food image uploads | `uploads/food-images` |

### Frontend (`frontend/.env`)

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Backend REST API base URL | `http://localhost:4000/api` |

---

## API Reference

### Auth

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Create a new account | No |
| POST | `/api/auth/login` | Log in and receive JWT | No |
| POST | `/api/auth/logout` | Invalidate session | Yes |
| GET | `/api/auth/profile` | Get current user profile | Yes |

### Food Logs

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/foodlogs` | Create a food log entry | Yes |
| GET | `/api/foodlogs` | List all food logs (filter/sort/paginate) | Yes |
| GET | `/api/foodlogs/:id` | Get a specific food log | Yes |
| PUT | `/api/foodlogs/:id` | Update a food log | Yes |
| DELETE | `/api/foodlogs/:id` | Soft-delete a food log | Yes |
| GET | `/api/foodlogs/search` | Search food logs by name/tag | Yes |

### Analytics

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/analytics/dashboard` | Summary dashboard stats |
| GET | `/api/analytics/weekly-calories` | Weekly calorie totals |
| GET | `/api/analytics/monthly-calories` | Monthly calorie totals |
| GET | `/api/analytics/lowest-calorie-day` | Day with fewest calories |
| GET | `/api/analytics/lowest-calorie-week` | Week with fewest calories |
| GET | `/api/analytics/meal-distribution` | Calorie breakdown by meal type |

> Full interactive docs available at **http://localhost:4000/api/docs**

---

## Database Schema

```mermaid
erDiagram
  USERS ||--o{ FOOD_LOGS : owns
  FOOD_LOGS ||--o{ FOOD_LOG_TAGS : has
  TAGS ||--o{ FOOD_LOG_TAGS : labels

  USERS {
    uuid id PK
    string name
    string email
    string password_hash
    datetime created_at
    datetime updated_at
  }

  FOOD_LOGS {
    uuid id PK
    uuid user_id FK
    string food_name
    string meal_category
    datetime consumed_date_time
    decimal portion_quantity
    string portion_unit
    int calories
    string notes
    string food_image_url
    boolean is_deleted
    datetime created_at
    datetime updated_at
  }

  TAGS {
    uuid id PK
    string name
  }

  FOOD_LOG_TAGS {
    uuid food_log_id FK
    uuid tag_id FK
  }
```

---

## Architecture

```mermaid
flowchart TD
  A["React + Vite Frontend"] --> B["Axios REST Client"]
  B --> C["Express Routes"]
  C --> D["Controllers"]
  D --> E["Service Layer"]
  E --> F["Prisma ORM"]
  F --> G["PostgreSQL"]
  C --> H["Auth / Validation / Upload Middleware"]
  D --> I["Swagger / OpenAPI Docs"]
```

---

## Testing

```bash
# Backend tests (Jest + Supertest)
cd backend && npm test

# Frontend tests (Vitest + Testing Library)
cd frontend && npm test
```

The included tests cover auth validation, protected route behaviour, and frontend routing. Integration tests backed by a real database can be added as a CI PostgreSQL service becomes available.

---

## Scripts Reference

### Backend

| Script | Command | Description |
|---|---|---|
| Dev server | `npm run dev` | Start with hot-reload via tsx |
| Build | `npm run build` | Compile TypeScript to `dist/` |
| Production | `npm start` | Run compiled build |
| Lint | `npm run lint` | ESLint check |
| Format | `npm run format` | Prettier format |
| Tests | `npm test` | Run Jest test suite |
| Generate client | `npm run prisma:generate` | Regenerate Prisma client |
| Migrate | `npm run prisma:migrate` | Apply schema migrations |
| Seed | `npm run prisma:seed` | Insert sample data |

### Frontend

| Script | Command | Description |
|---|---|---|
| Dev server | `npm run dev` | Start Vite dev server |
| Build | `npm run build` | Production bundle |
| Preview | `npm run preview` | Preview production build |
| Lint | `npm run lint` | ESLint check |
| Format | `npm run format` | Prettier format |
| Tests | `npm test` | Run Vitest suite |

---

## Future Expansion

The layered backend and typed frontend services are designed to support:

- **Weight Tracking** — log and chart body weight over time
- **Exercise Tracking** — calorie expenditure logging
- **AI Assistant** — natural language food logging
- **Voice Logging** — speech-to-food-log via browser APIs
- **Image Recognition** — identify food from photos
- **Nutrition Integrations** — pull data from external nutrition databases
- **Personalised Recommendations** — goal-based daily targets and insights

All future features can be added without changing the core auth and user ownership model.

---

> Built with ❤️ — Health Ledger MVP · Epic 1: Food Logging
