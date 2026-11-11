# Database Schema & Entity Relationships — TRIPORA AI

## Overview

The database is built on PostgreSQL with Prisma ORM. It implements 36 relational entities with strict foreign key integrity, UUID primary keys, automatic timestamps (`createdAt`, `updatedAt`), cascade deletion policies, and targeted indexes.

---

## Entity Relationship Overview

```
 [User] 1 ──── 1 [UserProfile]
        1 ──── 1 [UserPreference]
        1 ──── * [Session]
        1 ──── * [RefreshToken]
        1 ──── * [Trip (Owner)]
        1 ──── * [TripMember]
        1 ──── * [Expense (Payer)]
        1 ──── * [Notification]
        1 ──── * [AIUsage]

 [Trip] 1 ──── * [TripMember] 1 ──── * [ExpenseSplit]
        1 ──── * [TripInvitation]
        1 ──── * [Itinerary] 1 ──── * [ItineraryDay] 1 ──── * [ItineraryActivity]
        1 ──── 1 [Budget]
        1 ──── * [Expense] 1 ──── * [ExpenseSplit]
        1 ──── * [PackingList] 1 ──── * [PackingItem]
        1 ──── * [BookingReference]
        1 ──── * [UploadedDocument]

 [Destination] 1 ──── * [DestinationImage]
               1 ──── * [Attraction]
               1 ──── * [Restaurant]
               1 ──── * [Hotel] 1 ──── * [HotelOffer]
               1 ──── * [Trip]

 [FlightSearch] 1 ──── * [FlightOffer]
```

---

## Complete Entity Catalog (36 Entities)

1. **User**: Authentication credentials, roles (`USER`, `ADMIN`, `SUPPORT`), active status, verification tokens.
2. **UserProfile**: Full name, avatar URL, bio, phone, country, city.
3. **UserPreference**: Currency, language, travel pace (Relaxed/Balanced/Packed), budget tier, dietary notes.
4. **Session**: Active browser/device sessions with IP and user agent tracking.
5. **RefreshToken**: Cryptographic token hash rotation records with revocation timestamps.
6. **Destination**: City/country, region, coordinates (latitude/longitude), timezone, seasonal tags, daily budget.
7. **DestinationImage**: High-resolution photography with photographer attribution and cover flags.
8. **Attraction**: Cultural/historic landmarks, coordinates, duration, entry fee minor units, opening hours.
9. **Restaurant**: Dining spots, cuisine, price level, coordinates, opening hours, culinary ratings.
10. **Trip**: Primary trip record, owner ID, origin, destination, start/end dates, lifecycle status (`DRAFT`, `GENERATING`, `READY`, `UPCOMING`, `ONGOING`, `COMPLETED`, `CANCELLED`), party counts, budget.
11. **TripMember**: Joint memberships with assigned roles (`OWNER`, `EDITOR`, `VIEWER`).
12. **TripInvitation**: Expiring invitation tokens dispatched to co-traveler emails.
13. **Itinerary**: Versioned multi-day container for a trip.
14. **ItineraryDay**: Day number, calendar date, theme, and daily planning notes.
15. **ItineraryActivity**: Individual planned events, time slot (`MORNING`, `AFTERNOON`, `EVENING`), start/end times, visit duration, cost in minor units, transit notes.
16. **ActivityCategory**: Predefined taxonomy for activities (Sightseeing, Dining, Transit, Leisure, Culture).
17. **FlightSearch**: Query parameters (origin, destination, departure/return dates, cabin class).
18. **FlightOffer**: Search results with airlines, flight numbers, stops, duration, minor unit fares, baggage rules.
19. **Hotel**: Accommodations directory with star ratings, property types, coordinates, and amenities.
20. **HotelOffer**: Date-specific rates, room types, price per night, and cancellation policies.
21. **BookingReference**: Connected booking confirmation records (`FLIGHT`, `HOTEL`, `ACTIVITY`, `TRANSPORT`) with verified provider codes.
22. **SavedDestination**: User bookmarks and wishlists.
23. **SavedItem**: Bookmarked flights, accommodations, or activities for upcoming review.
24. **Budget**: Financial caps, allocation strategies across categories.
25. **Expense**: Recorded financial transactions, payer reference, category, exchange rate, base amount.
26. **ExpenseSplit**: Per-member shares of logged expenses with settlement statuses.
27. **PackingList**: Trip packing list master container.
28. **PackingItem**: Individual items, quantity, category, packed status, weather sensitivity flag.
29. **Conversation**: Chat session between traveler and TRIPORA AI.
30. **ChatMessage**: Chronological dialog history with role tags (`USER`, `ASSISTANT`, `SYSTEM`).
31. **AIUsage**: Operational telemetry logging prompt tokens, completion tokens, latency, provider, cost.
32. **Notification**: In-app alerts for invites, schedule updates, budget alerts, and reminders.
33. **Review**: Traveler reviews and star ratings for destinations and attractions.
34. **UploadedDocument**: Travel passes, visa copies, and boarding tickets with MIME types and sizes.
35. **AuditLog**: Administrative and security event audit records.
36. **ProviderConfiguration**: Circuit breaker telemetry, rate limits, monthly quotas for third-party APIs.
