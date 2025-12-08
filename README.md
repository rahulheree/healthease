# HealthEase

"Policybazaar for Healthcare" - India-first MVP.
Compare costs, book doctors, upload reports, and get empathetic AI guidance.

## Architecture
- **Frontend**: Next.js 14, TailwindCSS, TypeScript
- **Backend**: NestJS, Prisma, PostgreSQL
- **Infrastructure**: Docker Compose

## Quick Start

1. **Prerequisites**:
   - Node.js 18+
   - Docker & Docker Compose

2. **Setup Environment**:
   ```bash
   cp .env.example .env
   ```

3. **Install Dependencies**:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

4. **Run Application**:
   ```bash
   docker-compose up --build
   ```
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:4000](http://localhost:4000)
   - Swagger Docs: [http://localhost:4000/api](http://localhost:4000/api)

## Development

- **Database Migration**:
  ```bash
  cd backend
  npx prisma migrate dev
  ```
- **Seed Data**:
  ```bash
  cd backend
  npm run seed
  ```
