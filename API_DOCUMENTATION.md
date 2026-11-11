# RESTful API Endpoint Documentation — TRIPORA AI

**Base URL**: `/api/v1`
**Authentication**: Bearer Token in `Authorization` header (`Bearer <access_token>`)

---

## 1. Authentication (`/auth`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/auth/register` | Public | Register new user with email, password, full name |
| `POST` | `/auth/login` | Public | Authenticate with email/password; returns JWT access & refresh tokens |
| `POST` | `/auth/refresh` | Public | Exchange refresh token for fresh access token |
| `POST` | `/auth/logout` | Authenticated | Invalidate session |
| `GET` | `/auth/me` | Authenticated | Retrieve authenticated user profile & preferences |
| `POST` | `/auth/forgot-password` | Public | Request password reset token |
| `POST` | `/auth/reset-password` | Public | Set new password using verified reset token |

---

## 2. Destinations (`/destinations`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/destinations` | Public | Search & list destinations with filters (`search`, `country`, `featured`) |
| `GET` | `/destinations/:id` | Public | Get full destination guide with attractions & restaurants |
| `GET` | `/destinations/:id/weather` | Public | Get current weather and 5-day daily forecast |

---

## 3. Trips (`/trips`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/trips` | Authenticated | List all trips owned by or shared with traveler |
| `POST` | `/trips` | Authenticated | Create new trip record from wizard draft |
| `GET` | `/trips/:id` | Viewer+ | Retrieve trip detail, itinerary days, and members |
| `PATCH` | `/trips/:id` | Editor+ | Update trip dates, budget, notes, or preferences |
| `DELETE` | `/trips/:id` | Owner | Archive/soft-delete trip |
| `POST` | `/trips/:id/complete` | Editor+ | Transition trip status to `COMPLETED` |
| `POST` | `/trips/:id/cancel` | Owner | Transition trip status to `CANCELLED` |

---

## 4. Itinerary (`/trips/:tripId/itinerary`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/trips/:tripId/itinerary` | Viewer+ | Get structured day-by-day itinerary |
| `POST` | `/trips/:tripId/itinerary/generate` | Editor+ | Synthesize complete itinerary with AI engine |
| `POST` | `/trips/:tripId/itinerary/activities` | Editor+ | Add activity to a specific day slot |
| `PATCH` | `/trips/:tripId/itinerary/activities/:activityId` | Editor+ | Edit activity title, duration, cost, or slot |
| `DELETE` | `/trips/:tripId/itinerary/activities/:activityId` | Editor+ | Remove activity from day |
| `POST` | `/trips/:tripId/itinerary/reorder` | Editor+ | Update activity positions within a day |
| `POST` | `/trips/:tripId/itinerary/days/:dayId/optimize` | Editor+ | Optimize schedule times and prevent slot overlaps |
| `POST` | `/trips/:tripId/itinerary/days/:dayId/regenerate` | Editor+ | Regenerate single day with AI without modifying other days |

---

## 5. Budget & Expenses (`/trips/:tripId/budget`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/trips/:tripId/budget` | Viewer+ | Get budget breakdown, spent volume, and alerts |
| `GET` | `/trips/:tripId/budget/expenses` | Viewer+ | List all recorded transactions |
| `POST` | `/trips/:tripId/budget/expenses` | Editor+ | Log an expense with category and member splits |
| `DELETE` | `/trips/:tripId/budget/expenses/:expenseId` | Editor+ | Remove logged expense |

---

## 6. Collaboration (`/trips/:tripId/collaboration`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/trips/:tripId/collaboration` | Viewer+ | List members and their assigned roles |
| `POST` | `/trips/:tripId/collaboration/invite` | Owner | Dispatch co-traveler invite by email |
| `POST` | `/trips/:tripId/collaboration/accept/:token` | Authenticated | Join trip using secure invitation token |
| `DELETE` | `/trips/:tripId/collaboration/:memberId` | Owner | Revoke member access from trip |

---

## 7. Packing (`/trips/:tripId/packing`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/trips/:tripId/packing` | Viewer+ | Get categorized packing list & readiness % |
| `POST` | `/trips/:tripId/packing/items` | Editor+ | Add custom packing item |
| `PATCH` | `/trips/:tripId/packing/items/:itemId/toggle` | Editor+ | Toggle packed checkbox status |
| `DELETE` | `/trips/:tripId/packing/items/:itemId` | Editor+ | Delete item |
| `POST` | `/trips/:tripId/packing/generate-ai` | Editor+ | Synthesize climate/weather-dependent packing list |

---

## 8. Flights & Hotels

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/flights/search` | Public | Multi-carrier route search |
| `POST` | `/flights/revalidate` | Public | Confirm current price lock and seat availability |
| `POST` | `/flights/save` | Authenticated | Save selected flight offer into trip bookings |
| `GET` | `/hotels/search` | Public | Discover stays with star ratings & price filters |
| `POST` | `/hotels/save` | Authenticated | Save hotel offer into trip bookings |

---

## 9. AI Assistant & Concierge (`/ai`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/ai/chat` | Public / Auth | Conversational travel assistance with trip context |

---

## 10. Operations & Admin (`/admin`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/admin/overview` | Admin Only | System KPIs, total users, trips, AI calls, spend |
| `GET` | `/admin/users` | Admin Only | User directory |
| `GET` | `/admin/trips` | Admin Only | Global trip log |
| `GET` | `/admin/providers` | Admin Only | Circuit health, rate limits & quotas |
| `GET` | `/admin/audit-logs` | Admin Only | Security and audit trail |

---

## 11. Health & Probes

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/health` | Public | Operational status & database connectivity |
| `GET` | `/health/liveness` | Public | Liveness probe (returns 200 OK) |
| `GET` | `/health/readiness` | Public | Readiness probe (returns 200 OK) |
