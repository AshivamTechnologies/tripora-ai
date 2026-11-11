import { z } from 'zod';

export const createTripSchema = z.object({
  body: z.object({
    destination: z.string().min(2, 'Destination must be at least 2 characters'),
    origin: z.string().default(''),
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Start date must be in YYYY-MM-DD format'),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'End date must be in YYYY-MM-DD format'),
    adults: z.number().int().min(1).default(1),
    children: z.number().int().min(0).default(0),
    infants: z.number().int().min(0).default(0),
    travelStyles: z.array(z.string()).default([]),
    budgetMinor: z.number().int().min(0).default(0),
    currency: z.string().default('USD'),
    notes: z.string().default(''),
    preferences: z.record(z.any()).optional(),
  }),
});

export const updateTripSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    origin: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    status: z.enum(['DRAFT', 'GENERATING', 'READY', 'UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED']).optional(),
    adults: z.number().int().min(1).optional(),
    children: z.number().int().min(0).optional(),
    infants: z.number().int().min(0).optional(),
    budgetMinor: z.number().int().min(0).optional(),
    currency: z.string().optional(),
    notes: z.string().optional(),
    preferences: z.record(z.any()).optional(),
  }),
});
