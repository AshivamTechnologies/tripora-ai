# Project Architecture — TRIPORA AI

## High-Level Architecture Diagram

```
+---------------------------------------------------------------------------------+
|                                 CLIENT TIER                                     |
|  Next.js 13+ App Router (React, TypeScript, Tailwind CSS, shadcn/ui, Framer)    |
|  - Public Catalog (/destinations, /pricing, /about, /guides, /contact)          |
|  - Traveler Hub (/dashboard, /planner, /trips, /trips/[id]/...)                 |
|  - Flight & Hotel Engines (/flights, /hotels)                                   |
|  - Floating AI Travel Concierge (Global Widget)                                 |
|  - Administrative Operations Console (/admin)                                   |
+---------------------------------------+-----------------------------------------+
                                        |
                         REST / JSON (API Base: /api/v1)
                         JWT Bearer Authentication
                                        |
+---------------------------------------v-----------------------------------------+
|                                 SERVER TIER                                     |
|  Express.js + TypeScript (Modular Layered Architecture)                         |
|                                                                                 |
|  [Middleware Pipeline]                                                          |
|   ├── Helmet Security Headers                                                   |
|   ├── CORS Origin Allowlist Guard                                               |
|   ├── Rate Limiters (Auth, AI, Standard Limiter)                                |
|   ├── JWT Token Rotation & Session Validator                                    |
|   ├── Zod Payload Schema Validator                                              |
|   └── Centralized Exception & Audit Interceptor                                 |
|                                                                                 |
|  [Business Modules (/src/modules)]                                              |
|   ├── Auth (Register, Login, Refresh, Password Reset)                           |
|   ├── Users (Profile, Preferences, GDPR Export & Deletion)                      |
|   ├── Destinations (Catalog, Weather Forecast, Top Spots)                       |
|   ├── Trips (Lifecycle State Machine, Permissions)                              |
|   ├── Itinerary (Slot Allocator, Schedule Optimizer, Regenerator)               |
|   ├── Flights (Amadeus Engine, Revalidator, Trip Handoff)                       |
|   ├── Hotels (Accommodations Aggregator, Amenities, Saver)                      |
|   ├── Budgets (Minor Unit Math, Multi-Currency, CSV Export)                     |
|   ├── Collaboration (Invitations, RBAC: OWNER/EDITOR/VIEWER)                    |
|   ├── Packing (Weather-Driven AI Checklists)                                    |
|   ├── Assistant (Context-Aware Conversational Travel Advisor)                   |
|   └── Admin (Telemetry, Providers Uptime, System Audit Logs)                    |
+---------------------------------------+-----------------------------------------+
                                        |
                       Prisma ORM & Connection Pooler
                                        |
+---------------------------------------v-----------------------------------------+
|                                DATABASE TIER                                    |
|  Managed PostgreSQL (Relational Normalized Schema with 36 Core Entities)        |
|  - Strict Foreign Keys, Cascades, Indexes, and Unique Constraints               |
|  - BigInt / Minor-Unit Decimal Storage for Currency Safety                      |
|  - Standalone In-Memory/Offline Fallback Store for Local & Offline Resiliency    |
+---------------------------------------------------------------------------------+
```

## Architectural Design Principles

1. **Separation of Concerns**: Controllers handle HTTP contracts; services own pure business logic; integration adapters insulate external provider APIs.
2. **Resilience & Fallback First**: Every external provider (Gemini, Amadeus, OpenWeather, Razorpay) implements a dual-mode pattern:
   - Configured live API calls when valid credentials exist.
   - Intelligent dynamic fallback sandbox when credentials are unconfigured or unavailable.
3. **Financial Precision**: All currency amounts (budgets, expenses, flight fares, hotel nightly rates) are strictly stored and computed as integer minor units (`BigInt` / cents). Floating-point arithmetic errors are architecturally eliminated.
4. **Optimistic Updates with Guarded Rollbacks**: Collaborative itinerary modifications and packing state updates reflect immediately on client UI with server synchronization.
