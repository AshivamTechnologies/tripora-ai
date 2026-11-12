# TRIPORA RESERVE — System Architecture Reference

> **Corporate Custody**: [Ashivam Technologies](https://github.com/AshivamTechnologies)  
> **Production Deployment**: [https://news-main-five.vercel.app](https://news-main-five.vercel.app)

---

## 1. High-Level System Overview

TRIPORA RESERVE is an editorial, commercial-grade travel curation and concierge SaaS platform engineered with Next.js 13+ App Router, Node.js Express REST microservices, PostgreSQL with Prisma ORM, and high-frequency dispatch integrations.

```
                  ┌──────────────────────────────────────────┐
                  │            Client Browser                │
                  │   Desktop · Tablet · Mobile (iOS/Android)│
                  └─────────────────────┬────────────────────┘
                                        │ HTTPS / TLS 1.3
                                        ▼
                  ┌──────────────────────────────────────────┐
                  │        Next.js App Router (Edge/CDN)     │
                  │  SSR / Static Generation / Client Cache  │
                  └─────────┬──────────────────────┬─────────┘
                            │                      │
          Internal Proxy / REST API         Direct Client Fallback
                            │                      │
                            ▼                      ▼
┌──────────────────────────────────────┐  ┌───────────────────────────────────┐
│     Node.js Express Backend API      │  │ Local Offline-First Luxury Cache  │
│      JWT / Rate Limiting / Zod       │  │    (Local Session Restoration)    │
└──────────────────┬───────────────────┘  └───────────────────────────────────┘
                   │
         ┌─────────┴─────────┐
         ▼                   ▼
┌──────────────────┐  ┌─────────────────────────────────────────┐
│  PostgreSQL +    │  │ External Service Integrations           │
│  Prisma Relational│  │ · Amadeus GDS Aviation Flight Corridors │
│  Schema (36 tabs)│  │ · OpenWeather Atmospheric Telemetry     │
└──────────────────┘  │ · Gmail SMTP VIP Invitation Dispatch    │
                      │ · PCI-DSS 256-Bit Payment Gateway       │
                      └─────────────────────────────────────────┘
```

---

## 2. Directory Structure

```
.
├── app/                              # Next.js 13+ App Router Pages & Layouts
│   ├── about/                        # The Tripora Reserve Manifesto
│   ├── admin/                        # Executive Operations Command Matrix
│   ├── auth/                         # Luxury Authentication Portal
│   ├── checkout/                     # Payment Settlement & Booking Terminal
│   ├── contact/                      # 24/7 Concierge Hotline & WhatsApp
│   ├── dashboard/                    # Traveler Cockpit & Intelligence Hub
│   ├── destinations/                 # Curated Sanctuaries Catalog & Detail Views
│   ├── flights/                      # Lie-Flat Suites & Aviation Corridors
│   ├── guides/                       # Editorial Field Notes & Cultural Dispatches
│   ├── hotels/                       # 5-Star Partner Estates & Private Villas
│   ├── planner/                      # The Atelier Itinerary Studio
│   ├── pricing/                      # Voyager & Reserve Privilege Memberships
│   ├── privacy/                      # GDPR & CCPA Compliance Documentation
│   ├── terms/                        # Commercial Service Agreements
│   └── trips/                        # Expedition Workspace, Itinerary & Budgets
├── backend/                          # Express.js REST Microservices Engine
│   ├── prisma/                       # Database Schema & Migrations
│   ├── src/
│   │   ├── controllers/              # Route Request Handlers
│   │   ├── middleware/               # Auth, Security Gate, Error Handlers
│   │   ├── routes/                   # REST API v1 Resource Definitions
│   │   ├── services/                 # Business Logic & Math Integrity
│   │   └── tests/                    # Vitest Integration Test Suites
├── components/                       # Modular UI Components (shadcn/ui + Tailwind)
│   ├── admin/                        # Executive Telemetry & Management Tabs
│   ├── auth/                         # Client Session Guard & Auth Modal
│   ├── checkout/                     # Official Voucher & Settlement Ledger
│   ├── home/                         # Editorial Hero, Canvas & Marquee Ticker
│   ├── planner/                      # Multi-Step Atelier Itinerary Builder
│   └── trips/                        # Day-by-Day Timeline, Budget Splits, Packing
├── docs/                             # Clean Technical Specifications
│   ├── API_REFERENCE.md              # REST API v1 Endpoints & Payloads
│   ├── ARCHITECTURE.md               # Architecture & Data Flow Topology
│   └── SECURITY_COMPLIANCE.md        # Cryptography, PCI-DSS & Role Clearance
├── public/                           # Static Luxury Assets & Favicons
├── package.json                      # Frontend Dependencies & Scripts
├── tailwind.config.ts                # Haute Horlogerie Natural Editorial Palette
└── tsconfig.json                     # TypeScript Strict Mode Configuration
```

---

## 3. Core Architectural Modules

1. **Atelier Itinerary Studio**:
   - Paced spatial time-slot engine: Morning, Afternoon, Evening, and Night segments.
   - Durational geometry and walking buffer estimations.
   - Single-day atomic re-curation without altering manual customizations on other days.

2. **Mathematical Financial Ledger**:
   - Cents/Minor currency unit integers (`BigInt` / `MinorUnit`) eliminating floating-point rounding errors.
   - Proportional, equal, and custom group expense split allocations.
   - Direct CSV manifest ledger generation for export.

3. **Multi-Carrier Aviation & Sanctuary Aggregation**:
   - Direct live carrier fare lock simulation with IATA/GDS alignment.
   - Partner sanctuary collection featuring Aman, Belmond, and Four Seasons parity.

4. **Executive Operations Center (`/admin`)**:
   - Real-time command telemetry: Gross Booking Volume, Concierge SLA (<8 min), and Global Diplomatic Desks (Kyoto & Zurich).
   - Strict role-based Diplomatic Security Gate restricting back-office tools to verified `ADMIN` accounts.
