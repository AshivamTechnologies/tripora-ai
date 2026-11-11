# Product Requirement Document (PRD) — TRIPORA AI

## 1. Product Vision & Value Proposition

**TRIPORA AI** is a premium, AI-powered travel planning, optimization, and collaboration SaaS platform.
Tagline: *"Explore More. Plan Smarter. Travel Better."*

The platform solves the fragmented, chaotic nature of modern travel planning. Instead of juggling dozens of browser tabs, unsynchronized spreadsheets, and disconnected airline/hotel sites, TRIPORA AI provides an editorial, human-centered workspace combining AI itinerary synthesis, route-aware day pacing, real-time expense splitting, weather-sensitive packing checklists, and verified booking handoffs.

---

## 2. Target User Personas

### Persona A: "The Thoughtful Explorer" (Elena, 31, Product Designer)
- **Goal**: Wants high-culture, aesthetic, and culinary discoveries without rigid group tours.
- **Pain Point**: Spends 15+ hours researching blogs, saving pins, and estimating daily budgets.
- **Tripora Solution**: 7-step wizard curates a multi-day plan split into morning, afternoon, and evening slots with curated local dining suggestions.

### Persona B: "The Group Trip Coordinator" (Marcus, 28, Software Engineer)
- **Goal**: Organizing a 6-friend ski or beach trip with transparent expense sharing and assigned packing duties.
- **Pain Point**: Chasing friends for Venmo splits, forgotten adapters, and conflicting schedule requests.
- **Tripora Solution**: Role-based collaboration (OWNER/EDITOR/VIEWER), direct invite links, equal & custom expense splits with CSV export, and shared packing lists.

### Persona C: "The Time-Constrained Executive Traveler" (Sophia, 42, VP of Strategy)
- **Goal**: Fast weekend getaway or extended leisure trip with guaranteed flight routes and boutique lodging.
- **Pain Point**: Decision fatigue and unverified flight schedules.
- **Tripora Solution**: Direct multi-carrier flight comparison with price revalidation and curated boutique accommodations.

---

## 3. Functional Requirements

### 3.1 Public Experience
- **Hero & AI Destination Search**: Search by city, country, or interest; responsive visual cards.
- **Curated Destination Directory**: Deep guidebooks for global capitals & hidden retreats with seasonal recommendations, coordinates, and live 5-day weather.
- **Commercial SaaS Pricing**: Tiered plans (Free Explorer, Explorer Pro, Premium Nomads) with feature matrices and upgrade triggers.
- **Editorial Field Notes / Guides**: Cultural etiquette, rail pass guides, and dining guides.

### 3.2 AI Travel Planner (7-Step Wizard)
1. **Destination**: Primary destination, additional stops, departure origin.
2. **Dates**: Start & end dates, flexible date toggles.
3. **Travellers**: Adult, child, and infant counts.
4. **Travel Styles**: Cultural, Nature, Food exploration, Luxury, Budget, Adventure, Romantic, Solo, Relaxation.
5. **Budget**: Total trip budget, currency selection (USD, EUR, GBP, JPY, INR), group vs per-person scope.
6. **Preferences**: Travel pace (Relaxed / Balanced / Packed), dietary restrictions, accessibility requirements, accommodation preferences.
7. **Itinerary Generation**: AI structured synthesis with real-time progress state, failure recovery, and day-by-day slot populating.

### 3.3 Itinerary Builder & Schedule Optimizer
- Morning (before 12 PM), Afternoon (12 PM - 5 PM), Evening (after 5 PM) slot allocations.
- Real-time activity CRUD with cost in minor currency units and visit durations.
- Schedule route optimization algorithm sorting activities logically by time and geographic transit.
- Individual single-day AI regeneration without overwriting manual customizations on other days.

### 3.4 Flight & Hotel Discovery
- Flight search with origin/destination, dates, stops filters (Nonstop, 1-stop), cabin classes, and transparent pricing.
- Live price revalidation before provider booking handoff.
- Hotel & villa discovery with star ratings, property types, amenities, review scores, and cancellation terms.
- 1-click "Save to Trip" integration connecting saved booking references to the traveler's active itinerary.

### 3.5 Group Collaboration & Budgeting
- Secure invite dispatch by email with role assignment (OWNER, EDITOR, VIEWER).
- Multi-currency budget tracking with real-time remaining balance alerts.
- Logged expense splits with payer attribution and status tracking.
- 1-click CSV expense report export.

### 3.6 Weather-Sensitive Packing
- AI automatic suggestion generation tailored to destination climate and season.
- Categorized checklist (Clothing, Documents, Electronics, Health, Toiletries, Miscellaneous).
- Interactive checkbox tracking with dynamic progress bar.

### 3.7 Administrative Center
- System metrics (active users, total trips, AI token consumption, tracked spend).
- Live provider connectivity monitoring (Google Gemini, Amadeus, OpenWeather, Mapbox, Razorpay).
- User and trip directory management with role auditing.
