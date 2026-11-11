# Authentication & Role-Based Access Control (RBAC)

TRIPORA AI implements a zero-trust, stateless JWT authentication system with cryptographically hashed refresh token rotation.

---

## 1. Token Lifecycles & Security

- **Access Token**: Short-lived (15 minutes). Signed with `HS256` using `JWT_SECRET`. Carries user ID, verified email, and global role.
- **Refresh Token**: Long-lived (7 days). Signed with `JWT_REFRESH_SECRET`. Stored in the database as a SHA-256 / bcrypt hash.
- **Refresh Token Rotation**: When `/auth/refresh` is called, the used refresh token is revoked immediately and a new token pair is issued. Replay attempts on an already-revoked refresh token result in immediate session revocation.

---

## 2. Role Hierarchies

### Platform Roles (Global)
- `ADMIN`: Unrestricted access to system telemetry, provider health, user directories, and global audit logs (`/admin`).
- `SUPPORT`: Read-only access to traveler accounts for dispute resolution.
- `USER`: Standard traveler access to personal journeys, billing, and collaboration.

### Trip Permissions (Resource-Specific)
- `OWNER` (Weight: 3): Full authority. Can delete trip, cancel trip, remove collaborators, and manage financial budget caps.
- `EDITOR` (Weight: 2): Can generate AI itineraries, add/edit/reorder activities, log expenses, and update packing lists. Cannot delete the trip or remove the owner.
- `VIEWER` (Weight: 1): Read-only visibility. Can view daily schedule, flight details, packing progress, and spending summaries.
