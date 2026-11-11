import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { app } from '../app';

describe('TRIPORA AI Backend Integration Tests', () => {
  let authToken = '';
  let adminToken = '';
  let createdTripId = '';

  beforeAll(async () => {
    // Login with pre-seeded demo user
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'traveler@tripora.ai', password: 'Password123!' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    authToken = res.body.data.tokens.accessToken;

    // Login with pre-seeded admin user
    const adminRes = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'admin@tripora.ai', password: 'Password123!' });

    expect(adminRes.status).toBe(200);
    adminToken = adminRes.body.data.tokens.accessToken;
  });

  describe('Health Probes', () => {
    it('GET /health returns 200 and operational status', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('UP');
    });

    it('GET /health/liveness returns 200 OK', async () => {
      const res = await request(app).get('/health/liveness');
      expect(res.status).toBe(200);
      expect(res.text).toBe('OK');
    });
  });

  describe('Authentication Module', () => {
    it('POST /api/v1/auth/register registers a new user', async () => {
      const uniqueEmail = `testuser_${Date.now()}@tripora.ai`;
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: uniqueEmail,
          password: 'Password123!',
          fullName: 'Test Traveler',
          country: 'Canada',
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user.email).toBe(uniqueEmail);
      expect(res.body.data.tokens.accessToken).toBeDefined();
    });

    it('POST /api/v1/auth/login rejects invalid password', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'traveler@tripora.ai', password: 'WrongPassword!' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('GET /api/v1/auth/me returns authenticated user details', async () => {
      const res = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.email).toBe('traveler@tripora.ai');
    });
  });

  describe('Destinations Module', () => {
    it('GET /api/v1/destinations returns list of destinations', async () => {
      const res = await request(app).get('/api/v1/destinations');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.body.data[0].name).toBeDefined();
    });

    it('GET /api/v1/destinations/:id/weather returns forecast', async () => {
      const res = await request(app).get('/api/v1/destinations/dest-bali/weather');
      expect(res.status).toBe(200);
      expect(res.body.data.forecast.length).toBeGreaterThan(0);
    });
  });

  describe('Trips & Itinerary Module', () => {
    it('POST /api/v1/trips creates a new trip', async () => {
      const res = await request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          destination: 'Tokyo, Japan',
          origin: 'New York (JFK)',
          startDate: '2026-12-01',
          endDate: '2026-12-07',
          adults: 2,
          travelStyles: ['Cultural', 'Food exploration'],
          budgetMinor: 300000,
          currency: 'USD',
          notes: 'Visit historical temples and taste authentic ramen',
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBeDefined();
      createdTripId = res.body.data.id;
    });

    it('GET /api/v1/trips lists user trips', async () => {
      const res = await request(app)
        .get('/api/v1/trips')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('POST /api/v1/trips/:tripId/itinerary/generate generates AI itinerary', async () => {
      const res = await request(app)
        .post(`/api/v1/trips/${createdTripId}/itinerary/generate`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.days.length).toBeGreaterThan(0);
      expect(res.body.data.days[0].activities.length).toBeGreaterThan(0);
    });

    it('POST /api/v1/trips/:tripId/itinerary/activities adds custom activity', async () => {
      const itinRes = await request(app)
        .get(`/api/v1/trips/${createdTripId}/itinerary`)
        .set('Authorization', `Bearer ${authToken}`);

      const firstDayId = itinRes.body.data.days[0].id;

      const res = await request(app)
        .post(`/api/v1/trips/${createdTripId}/itinerary/activities`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          dayId: firstDayId,
          title: 'Tokyo Skytree Sunset View',
          category: 'Viewpoint',
          location: 'Sumida City, Tokyo',
          timeSlot: 'EVENING',
          durationMinutes: 90,
          estimatedCostMinor: 2500,
        });

      expect(res.status).toBe(201);
      expect(res.body.data.title).toBe('Tokyo Skytree Sunset View');
    });
  });

  describe('Budget & Expenses Module', () => {
    it('GET /api/v1/trips/:tripId/budget returns budget overview', async () => {
      const res = await request(app)
        .get(`/api/v1/trips/${createdTripId}/budget`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.totalBudgetMinor).toBe(300000);
    });

    it('POST /api/v1/trips/:tripId/budget/expenses adds an expense', async () => {
      const res = await request(app)
        .post(`/api/v1/trips/${createdTripId}/budget/expenses`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Bullet Train Pass (Shinkansen)',
          category: 'TRANSPORT',
          amountMinor: 35000,
          currency: 'USD',
          notes: '7-day Tokyo-Kyoto JR pass',
        });

      expect(res.status).toBe(201);
      expect(res.body.data.amountMinor).toBe(35000);
    });
  });

  describe('Collaboration & Packing Modules', () => {
    it('POST /api/v1/trips/:tripId/collaboration/invite invites a collaborator', async () => {
      const res = await request(app)
        .post(`/api/v1/trips/${createdTripId}/collaboration/invite`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ email: 'friend@tripora.ai', role: 'EDITOR' });

      expect(res.status).toBe(201);
      expect(res.body.data.token).toBeDefined();
    });

    it('GET /api/v1/trips/:tripId/packing returns packing checklist', async () => {
      const res = await request(app)
        .get(`/api/v1/trips/${createdTripId}/packing`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.items).toBeDefined();
    });
  });

  describe('Flights & Hotels Search', () => {
    it('GET /api/v1/flights/search returns flight offers', async () => {
      const res = await request(app)
        .get('/api/v1/flights/search?origin=JFK&destination=NRT&departureDate=2026-12-01');

      expect(res.status).toBe(200);
      expect(res.body.data.offers.length).toBeGreaterThan(0);
    });

    it('GET /api/v1/hotels/search returns hotel options', async () => {
      const res = await request(app)
        .get('/api/v1/hotels/search?destination=Tokyo&checkInDate=2026-12-01&checkOutDate=2026-12-07');

      expect(res.status).toBe(200);
      expect(res.body.data.hotels.length).toBeGreaterThan(0);
    });
  });

  describe('AI Assistant & Admin Modules', () => {
    it('POST /api/v1/ai/chat delivers contextual travel assistance', async () => {
      const res = await request(app)
        .post('/api/v1/ai/chat')
        .send({ message: 'What should I wear in Tokyo during December?', tripId: createdTripId });

      expect(res.status).toBe(200);
      expect(res.body.data.message).toBeDefined();
      expect(res.body.data.suggestedActions.length).toBeGreaterThan(0);
    });

    it('GET /api/v1/admin/overview succeeds for admin user', async () => {
      const res = await request(app)
        .get('/api/v1/admin/overview')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.metrics.totalUsers).toBeGreaterThan(0);
    });

    it('GET /api/v1/admin/overview fails for non-admin user', async () => {
      const res = await request(app)
        .get('/api/v1/admin/overview')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(403);
    });
  });
});
