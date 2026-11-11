# TRIPORA AI — Premium AI-Powered Travel Planning & Management SaaS

> *"Explore More. Plan Smarter. Travel Better."*

[![Next.js 13+](https://img.shields.io/badge/Frontend-Next.js%20App%20Router-black?logo=next.js)](https://nextjs.org)
[![Node.js & Express](https://img.shields.io/badge/Backend-Node.js%20%2F%20Express%20REST-green?logo=node.js)](https://nodejs.org)
[![TypeScript Strict](https://img.shields.io/badge/Language-TypeScript%20Strict-blue?logo=typescript)](https://www.typescriptlang.org)
[![PostgreSQL & Prisma](https://img.shields.io/badge/Database-PostgreSQL%20%26%20Prisma-indigo?logo=prisma)](https://prisma.io)
[![Google Gemini AI](https://img.shields.io/badge/AI-Google%20Gemini%201.5%20Flash-orange?logo=google)](https://deepmind.google/technologies/gemini)
[![Tests Passing](https://img.shields.io/badge/Tests-20%2F20%20Passing-brightgreen?logo=vitest)](https://vitest.dev)
[![Deployed on Render](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render)](https://render.com)
[![Deployed on Vercel](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)](https://vercel.com)

TRIPORA AI is an editorial, commercial-grade travel technology SaaS platform. It combines spatial route optimization, transparent multi-currency budget calculations, real-time external airline/hotel handoffs, and Google Gemini AI itinerary synthesis into a unified, human-centered web application.

---

## Key Features

- **7-Step AI Travel Wizard**: Destination, dates, party breakdown, travel styles, budget scope, pace & dietary requirements.
- **Interactive Day-by-Day Itinerary Studio**: Morning, afternoon, and evening slots with activity CRUD, visit durations, and schedule route optimization.
- **Single-Day AI Regeneration**: Refresh an individual day without touching manual customizations on other days.
- **Flight Discovery Engine**: Search multi-carrier routes, compare fares, revalidate prices, and save flight offers directly to trips.
- **Hotel & Villa Accommodations**: Explore handpicked stays with star ratings, property types, amenities, and cancellation terms.
- **Financial Budget Tracking**: Safe minor-unit financial math, Recharts spending breakdown, equal & custom group splits, and 1-click CSV export.
- **Collaborative Group Workspaces**: Invite friends via secure tokens with `OWNER`, `EDITOR`, and `VIEWER` permission tiers.
- **Weather-Sensitive Packing Checklist**: Climate-aware AI packing recommendations with interactive progress tracking.
- **Floating AI Travel Concierge**: Context-aware AI assistant grounded in your active destination and schedule.
- **Administrative Operations Center**: Real-time SaaS telemetry, provider circuit health monitoring, user directory, and audit logs.

---

## Tech Stack

### Frontend
- **Framework**: Next.js (App Router), React, TypeScript Strict Mode
- **Styling**: Tailwind CSS with custom natural editorial palette (Forest Green `#315B46`, Sage `#8CA68D`, Mist `#F6F7F2`, Accent Gold `#C5A46A`)
- **Components**: shadcn/ui, Radix UI, Lucide Icons, Framer Motion
- **Data & Forms**: React Hook Form, Zod, Recharts, TanStack Query

### Backend
- **Runtime & API**: Node.js, Express.js, TypeScript
- **Architecture**: Modular RESTful Architecture (`/api/v1`)
- **Database ORM**: Prisma ORM with 36 normalized relational entities
- **Database Engine**: PostgreSQL (Render Managed) + Zero-dependency standalone fallback
- **Authentication**: JWT Access Token (15m) + Hashed Refresh Token (7d) Rotation
- **Security**: Helmet, CORS Allowlist, Rate Limiters, Zod Request Sanitization
- **AI Engine**: Google Gemini 1.5 Flash with structured JSON schema validation

---

## Quick Start (Local Development)

### 1. Prerequisites
- Node.js >= 20.x
- Git

### 2. Clone & Install
```bash
git clone https://github.com/Ritikgupta-tech/tripora-ai.git
cd tripora-ai

# Install root & frontend dependencies
npm install

# Install & compile backend
cd backend
npm install
npx prisma generate
npm run build
```

### 3. Run Automated Tests
```bash
cd backend
npm test
```
*Executes all 20 end-to-end integration test suites.*

### 4. Run Locally
In terminal 1 (Backend API):
```bash
cd backend
npm start
# REST API running on http://localhost:5000
```

In terminal 2 (Frontend Client):
```bash
npm run dev
# Next.js running on http://localhost:3000
```

---

## Docker Deployment

To launch PostgreSQL, Redis, Backend, and Frontend containers:
```bash
docker-compose up --build -d
```

---

## Deployment & Hosting

- **Frontend on Vercel**: Ready for 1-click import using standard Next.js preset.
- **Backend on Render**: Complete `render.yaml` blueprint included for automatic web service + PostgreSQL provisioning.

---

## Documentation Index

- [`PRD.md`](./PRD.md) — Product Requirements & Personas
- [`PROJECT_ARCHITECTURE.md`](./PROJECT_ARCHITECTURE.md) — System Architecture Diagram & Data Flows
- [`DATABASE_SCHEMA.md`](./DATABASE_SCHEMA.md) — 36 Relational Entities & ER Diagram
- [`BUSINESS_LOGIC.md`](./BUSINESS_LOGIC.md) — Trip State Machine, Schedule Optimizer, Budget Math
- [`API_DOCUMENTATION.md`](./API_DOCUMENTATION.md) — RESTful Endpoint Catalog
- [`AI_INTEGRATION.md`](./AI_INTEGRATION.md) — Gemini Adapter & Schema Guardrails
- [`EXTERNAL_PROVIDERS.md`](./EXTERNAL_PROVIDERS.md) — Amadeus, OpenWeather & Fallback Matrix
- [`AUTHENTICATION.md`](./AUTHENTICATION.md) — JWT Rotation & RBAC Specification
- [`SECURITY.md`](./SECURITY.md) — Security Hardening & Rate Limiting
- [`DEPLOYMENT.md`](./DEPLOYMENT.md) — Render, Vercel & Docker Operations
- [`TESTING.md`](./TESTING.md) — Automated Test Suite & Acceptance Results
- [`ENVIRONMENT_SETUP.md`](./ENVIRONMENT_SETUP.md) — Variable Reference & Quick Start
- [`PRODUCTION_READINESS.md`](./PRODUCTION_READINESS.md) — Feature Status Matrix & Readiness Review

---

## License

TRIPORA AI is licensed under the MIT License.
Explore More. Plan Smarter. Travel Better.
