import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.routes';
import { userRoutes } from '../modules/users/users.routes';
import { destinationRoutes } from '../modules/destinations/destinations.routes';
import { tripRoutes } from '../modules/trips/trips.routes';
import { itineraryRoutes } from '../modules/itinerary/itinerary.routes';
import { budgetRoutes } from '../modules/budgets/budgets.routes';
import { collaborationRoutes } from '../modules/collaboration/collaboration.routes';
import { packingRoutes } from '../modules/packing/packing.routes';
import { flightRoutes } from '../modules/flights/flights.routes';
import { hotelRoutes } from '../modules/hotels/hotels.routes';
import { assistantRoutes } from '../modules/assistant/assistant.routes';
import { adminRoutes } from '../modules/admin/admin.routes';

const router = Router();

// API v1 Mounts
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/destinations', destinationRoutes);
router.use('/trips', tripRoutes);
router.use('/trips/:tripId/itinerary', itineraryRoutes);
router.use('/trips/:tripId/budget', budgetRoutes);
router.use('/trips/:tripId/collaboration', collaborationRoutes);
router.use('/trips/:tripId/packing', packingRoutes);
router.use('/flights', flightRoutes);
router.use('/hotels', hotelRoutes);
router.use('/ai', assistantRoutes);
router.use('/admin', adminRoutes);

export const apiRouter = router;
