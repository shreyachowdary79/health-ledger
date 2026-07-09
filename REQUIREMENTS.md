# Health Ledger — Requirements

This document lists all runtime and development dependencies across the monorepo.

---

## System Requirements

| Tool | Minimum Version | Purpose |
|---|---|---|
| Node.js | 18.x | JavaScript runtime for backend & frontend tooling |
| npm | 9.x | Package manager (bundled with Node.js) |
| PostgreSQL | 14.x | Relational database |
| Git | any | Version control |
| Docker *(optional)* | 24.x | Container-based full-stack setup |

---

## Backend Dependencies (`backend/`)

### Runtime Dependencies

| Package | Version | Purpose |
|---|---|---|
| `@prisma/client` | ^5.22.0 | Type-safe PostgreSQL ORM client |
| `bcryptjs` | ^2.4.3 | Password hashing |
| `cors` | ^2.8.5 | Cross-origin resource sharing middleware |
| `dotenv` | ^16.4.7 | Load environment variables from `.env` |
| `express` | ^4.21.1 | HTTP web framework |
| `express-rate-limit` | ^7.4.1 | Rate limiting to prevent abuse |
| `express-validator` | ^7.2.0 | Request body validation |
| `helmet` | ^8.0.0 | Secure HTTP headers |
| `jsonwebtoken` | ^9.0.2 | JWT creation and verification |
| `multer` | ^1.4.5-lts.1 | Multipart form data / file upload handling |
| `swagger-jsdoc` | ^6.2.8 | Generate OpenAPI spec from JSDoc comments |
| `swagger-ui-express` | ^5.0.1 | Serve Swagger UI at `/api/docs` |
| `uuid` | ^10.0.0 | UUID generation |

### Development Dependencies

| Package | Version | Purpose |
|---|---|---|
| `prisma` | ^5.22.0 | Prisma CLI (migrations, generation, seeding) |
| `tsx` | ^4.19.2 | TypeScript execution and hot-reload for dev |
| `typescript` | ^5.6.3 | TypeScript compiler |
| `jest` | ^29.7.0 | Test runner |
| `ts-jest` | ^29.2.5 | TypeScript transformer for Jest |
| `supertest` | ^7.0.0 | HTTP integration testing |
| `eslint` | ^9.15.0 | Code linter |
| `@typescript-eslint/parser` | ^8.15.0 | ESLint TypeScript parser |
| `@typescript-eslint/eslint-plugin` | ^8.15.0 | TypeScript ESLint rules |
| `prettier` | ^3.3.3 | Code formatter |
| `@types/bcryptjs` | ^2.4.6 | Type definitions |
| `@types/cors` | ^2.8.17 | Type definitions |
| `@types/express` | ^5.0.0 | Type definitions |
| `@types/jest` | ^29.5.14 | Type definitions |
| `@types/jsonwebtoken` | ^9.0.7 | Type definitions |
| `@types/multer` | ^1.4.12 | Type definitions |
| `@types/node` | ^22.9.0 | Type definitions |
| `@types/supertest` | ^6.0.2 | Type definitions |
| `@types/swagger-jsdoc` | ^6.0.4 | Type definitions |
| `@types/swagger-ui-express` | ^4.1.7 | Type definitions |

---

## Frontend Dependencies (`frontend/`)

### Runtime Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` | ^18.3.1 | UI library |
| `react-dom` | ^18.3.1 | React DOM renderer |
| `react-router-dom` | ^6.28.0 | Client-side routing |
| `react-hook-form` | ^7.53.2 | Performant form state management |
| `@hookform/resolvers` | ^3.9.1 | Zod integration for React Hook Form |
| `zod` | ^3.23.8 | Schema validation |
| `axios` | ^1.7.7 | HTTP client for API calls |
| `recharts` | ^2.13.3 | Charting library for analytics |
| `lucide-react` | ^0.468.0 | Icon library |
| `react-hot-toast` | ^2.4.1 | Toast notification system |

### Development Dependencies

| Package | Version | Purpose |
|---|---|---|
| `vite` | ^5.4.11 | Frontend build tool and dev server |
| `@vitejs/plugin-react` | ^4.3.3 | Vite plugin for React (Fast Refresh) |
| `typescript` | ^5.6.3 | TypeScript compiler |
| `tailwindcss` | ^3.4.15 | Utility-first CSS framework |
| `postcss` | ^8.4.49 | CSS processing |
| `autoprefixer` | ^10.4.20 | Auto-add CSS vendor prefixes |
| `vitest` | ^2.1.5 | Unit test runner (Vite-native) |
| `jsdom` | ^25.0.1 | DOM environment for tests |
| `@testing-library/react` | ^16.0.1 | React component testing utilities |
| `@testing-library/jest-dom` | ^6.6.3 | Custom DOM matchers |
| `@testing-library/user-event` | ^14.5.2 | Simulate user interactions in tests |
| `eslint` | ^9.15.0 | Code linter |
| `eslint-plugin-react-hooks` | ^5.0.0 | React hooks linting rules |
| `@typescript-eslint/parser` | ^8.15.0 | ESLint TypeScript parser |
| `@typescript-eslint/eslint-plugin` | ^8.15.0 | TypeScript ESLint rules |
| `prettier` | ^3.3.3 | Code formatter |
| `@types/react` | ^18.3.12 | Type definitions |
| `@types/react-dom` | ^18.3.1 | Type definitions |

---

## Installing All Dependencies

```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

> All exact versions are pinned in the respective `package-lock.json` files for reproducible installs.
