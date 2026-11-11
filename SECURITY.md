# Production Security & Hardening Guide — TRIPORA AI

## 1. Perimeter Defenses

- **HTTP Security Headers**: Enforced via `helmet` including `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection: 1; mode=block`, and strict `Referrer-Policy`.
- **CORS Allowlist**: Explicitly restrains cross-origin API invocations to authorized frontends.
- **Layered Rate Limiting**:
  - `authLimiter`: 20 requests per 15 minutes to thwart brute-force password guessing.
  - `aiLimiter`: 15 operations per minute to defend against prompt scraping and API cost exhaustion.
  - `standardLimiter`: 300 requests per 15 minutes per IP.

---

## 2. Input Sanitization & Injection Prevention

- **Strict Schema Validation**: Every incoming request body, query parameter, and route ID is parsed through Zod schemas before hitting business services.
- **SQL Injection Defenses**: PostgreSQL queries run through parameterized Prisma ORM client queries, eliminating raw unescaped string concatenations.
- **Prompt Injection Guardrails**: AI context builders wrap user travel preferences in isolated structural delimiters, disallowing arbitrary system instruction overrides or tool executions.

---

## 3. Financial & PII Protection

- **Payment Isolation**: No credit card or debit card PANs touch TRIPORA AI servers. All billing transactions utilize tokenized sessions via PCI-DSS compliant gateways.
- **Minor Unit Integrity**: Minor unit integers (`BigInt`) protect against floating point rounding exploits.
- **Audit Logging**: Sensitive actions (`TRIP_DELETED`, `COLLABORATOR_REMOVED`, `ROLE_CHANGED`) generate immutable audit log records.
