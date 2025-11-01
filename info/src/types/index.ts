import { z } from 'zod';

export const userInfoSchema = z.object({
    ipaddress: z.string(),
    coordinates: z.tuple([z.number(), z.number()]),
    country: z.string(),
    capital: z.string(),
    state: z.string(),
    zip: z.number().nullable().default(null),
    region: z.string(),
    timezone: z.string(),
    isp: z.string(),
    id: z.number().optional(),
    created_at: z.string().optional(),
});


export type locationData = z.infer<typeof userInfoSchema>;
