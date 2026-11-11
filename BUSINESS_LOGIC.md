# Core Business Logic Specification — TRIPORA AI

## 1. Trip Lifecycle State Machine

A trip progresses strictly through defined states governed by dates, generation status, and explicit traveler actions:

```
[DRAFT] ───(Trigger AI / Save)───> [GENERATING]
                                        │
                         ┌──────────────┴──────────────┐
                   (AI Success)                  (AI Failure)
                         │                             │
                         v                             v
                      [READY]                      [DRAFT]
                         │                       (Preserves Data)
                  (Today < StartDate)
                         │
                         v
                     [UPCOMING]
                         │
                  (Today >= StartDate)
                         │
                         v
                     [ONGOING]
                         │
                  (Today > EndDate OR Explicit Completion)
                         │
                         v
                    [COMPLETED]
```

- **Cancellation Rules**: A trip in any state can be marked `CANCELLED` by the trip `OWNER`. A cancelled trip is frozen: no activities, budget adjustments, or collaborator invites can be dispatched unless reactivated back to `READY`.
- **Generation Safety**: If AI generation encounters a transient network timeout or rate limit, the trip remains safely in `DRAFT` state with all wizard parameters intact. No data is lost.

---

## 2. Schedule Optimization Engine

The Schedule Optimizer (`POST /api/v1/trips/:id/itinerary/days/:dayId/optimize`) algorithm:
1. **Slot Segregation**: Groups activities into `MORNING`, `AFTERNOON`, and `EVENING`.
2. **Conflict Resolution**: Calculates duration and allocates non-overlapping start/end times:
   - Morning activities: sequenced starting from 09:00 AM up to 12:00 PM.
   - Lunch break: protected from 12:00 PM to 01:30 PM.
   - Afternoon activities: sequenced from 01:30 PM to 05:00 PM.
   - Evening dining & leisure: sequenced from 06:30 PM onwards.
3. **Pacing Guarantee**: Prevents more than 4 intense sightseeing activities in a single calendar day to avoid traveler fatigue.

---

## 3. Financial & Budget Calculations

- **Minor Unit Principle**: All monetary values are represented as integer cents (`$120.50` = `12050`).
- **Dynamic Balancing**:
  $$\text{Remaining Budget} = \text{Total Allocated Budget} - \sum \text{Expense Amount}$$
- **Threshold Alerts**:
  - When $\text{Spent} \ge 85\%$ of Total Budget: Warning badge surfaced on Trip Hub.
  - When $\text{Spent} > \text{Total Budget}$: Over-budget alert displayed with exact overage amount.
- **Group Splitting**:
  - Equal split: $\text{Share per member} = \lfloor \frac{\text{Expense Amount}}{N} \rfloor$ with residual minor units allocated to the payer.
  - Settlement: Payer's own split is marked `isSettled = true` automatically.

---

## 4. Flight & Hotel Handoff Protocol

1. **Discovery & Filtering**: Displays live or verified sandbox schedules.
2. **Price Revalidation**: When the user clicks "Book on Airline", the backend calls `/api/v1/flights/revalidate` to confirm fare availability within a 15-minute lock window.
3. **Handoff**: Opens the verified direct airline/hotel checkout portal with parameters prefilled. TRIPORA AI never fabricates booking reference numbers (PNRs) or falsely marks unconfirmed reservations as confirmed.
