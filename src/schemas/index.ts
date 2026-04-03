import { z } from 'zod';
import { Role, EntryType } from '@prisma/client';

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.nativeEnum(Role).optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export const recordSchema = z.object({
  body: z.object({
    amount: z.number().positive(),
    type: z.nativeEnum(EntryType),
    category: z.string().min(1),
    date: z.string().datetime(),
    notes: z.string().optional(),
  }),
});

export const updateRecordSchema = z.object({
  body: z.object({
    amount: z.number().positive().optional(),
    type: z.nativeEnum(EntryType).optional(),
    category: z.string().min(1).optional(),
    date: z.string().datetime().optional(),
    notes: z.string().optional(),
  }),
});

export const dashboardFilterSchema = z.object({
  query: z.object({
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
  }),
});
