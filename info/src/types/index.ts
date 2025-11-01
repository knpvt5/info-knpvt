import { z } from 'zod';

export const userInfoSchema = z.object({
    ipaddress: z.string(),
    coordinates: z.tuple([z.number(), z.number()]),
    country: z.string(),
    capital: z.string(),
    state: z.string(),
    zip: z.number(),
    region: z.string(),
    timezone: z.string(),
    isp: z.string(),
});


export type locationData = z.infer<typeof userInfoSchema>;
