# TRIPORA RESERVE — Security Architecture & Compliance

> **Corporate Custody**: [Ashivam Technologies](https://github.com/AshivamTechnologies)  
> **Classification**: Enterprise Production Standard

---

## 1. Authentication & Role Clearance

- **Token Rotation**: 15-minute cryptographically signed JWT access tokens paired with 7-day SHA-256 hashed refresh tokens.
- **Role Hierarchy**:
  - `ADMIN`: Executive Diplomatic Clearance. Unlocks back-office inventory curation, provider circuit breaker controls, and system telemetry at `/admin`.
  - `OWNER`: Full editorial authority over owned journeys and billing vouchers.
  - `EDITOR`: Permitted to add, reorder, and refine activities, packing items, and expense records.
  - `VIEWER`: Read-only guest access to day itineraries and cultural field notes.
- **Silent Local Session Restoration**: When network availability is transient, user clearance is verified via local cryptographically signed session tokens to ensure uninterrupted concierge UX without logging unauthenticated 401 exceptions.

---

## 2. Perimeter Defense & Rate Limiting

- **HTTP Security Headers (Helmet)**:
  - `Content-Security-Policy`: Restricts scripts, styles, and image origins.
  - `X-Content-Type-Options: nosniff`: Defends against MIME-sniffing exploits.
  - `X-Frame-Options: DENY`: Prevents UI clickjacking in external iframes.
  - `Referrer-Policy: strict-origin-when-cross-origin`.
- **Layered Rate Limiting**:
  - `authLimiter`: 20 attempts per 15 minutes to thwart brute-force credential stuffing.
  - `conciergeLimiter`: 30 requests per minute per authenticated traveler.
  - `standardLimiter`: 300 requests per 15 minutes per IP address.

---

## 3. Financial Integrity & PCI-DSS Isolation

- **Zero Card Storage**: Primary Account Numbers (PANs), cardholder PINs, and CVV security codes are never stored on TRIPORA application servers.
- **Tokenized Settlement**: All card transactions are encrypted with 256-bit SSL via PCI-DSS Level 1 compliant gateway endpoints.
- **Minor-Unit Currency Architecture**: All monetary transactions and ledger balances are stored strictly in integer minor currency units (cents, yen, pence) to prevent binary floating-point roundoff errors.

---

## 4. Immutable Audit Trail

All critical security, administrative, and financial lifecycle events generate an immutable audit log entry containing:
- `timestamp`: ISO-8601 UTC timestamp.
- `actorId`: Authenticated user UUID and IP address hash.
- `action`: Specific operation code (`ADMIN_CLEARANCE_AUTHENTICATED`, `EXPEDITION_RESERVED`, `MEMBER_PROMOTED`, `SANCTUARY_CREATED`).
- `metadata`: Sanitized operational parameters.
