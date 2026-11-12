# TRIPORA RESERVE — REST API v1 Reference

> **Base URL**: `https://tripora-ai-backend.onrender.com/api/v1` (Production)  
> **Local URL**: `http://localhost:5000/api/v1`

---

## 1. Authentication & Traveler Identity

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Register a new traveler profile | No |
| `POST` | `/auth/login` | Authenticate traveler credentials & issue JWT pair | No |
| `POST` | `/auth/refresh` | Rotate expired 15-minute access token via refresh token | Yes (Cookie/Bearer) |
| `GET` | `/auth/me` | Fetch authenticated profile, privileges, and active role | Yes |
| `POST` | `/auth/logout` | Revoke active refresh session | Yes |

---

## 2. Curated Sanctuaries & Destinations

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/destinations` | List all curated sanctuaries with filters (region, tag) | No |
| `GET` | `/destinations/:id` | Fetch comprehensive sanctuary dossier with attractions & dining | No |
| `GET` | `/destinations/:id/weather` | Real-time atmospheric forecast & 5-day outlook | No |

---

## 3. Expeditions & Itineraries

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/trips` | List traveler's curated expeditions | Yes |
| `POST` | `/trips` | Initialize a new bespoke expedition from draft | Yes |
| `GET` | `/trips/:id` | Fetch full expedition timeline, days, and activities | Yes |
| `DELETE` | `/trips/:id` | Permanently archive/delete an expedition | Yes (Owner) |
| `POST` | `/trips/:id/itinerary/activities` | Append an activity to a specific day slot | Yes (Editor/Owner) |
| `DELETE` | `/trips/:id/itinerary/activities/:actId` | Remove an activity from a day slot | Yes (Editor/Owner) |
| `POST` | `/trips/:id/itinerary/days/:dayId/optimize` | Spatially balance day itinerary slots | Yes (Editor/Owner) |

---

## 4. Collaborative Circle & Expense Ledgers

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/invite` | Dispatch co-traveler invite via Gmail SMTP relay | Yes |
| `GET` | `/trips/:id/budget` | Aggregate expense totals, remaining funds, and category splits | Yes |
| `POST` | `/trips/:id/budget/expenses` | Log a transaction with category, payer, and split list | Yes |
| `DELETE` | `/trips/:id/budget/expenses/:expId`| Delete an expense entry | Yes |
| `GET` | `/trips/:id/packing` | Fetch weather-aligned packing checklist | Yes |
| `PATCH` | `/trips/:id/packing/items/:itemId/toggle` | Toggle item packed readiness status | Yes |

---

## 5. Settlement & Booking Vouchers

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/checkout` | Process booking settlement, generate booking ref & email voucher | Yes |
| `POST` | `/api/checkout/membership` | Activate annual Voyager or Private Reserve membership | Yes |
