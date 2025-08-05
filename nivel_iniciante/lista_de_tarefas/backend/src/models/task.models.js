import { z } from 'zod';

export const schemaTask = z.object({
    title: z.string().min(3),
    task: z.string().min(5),
    completed: z.boolean().optional().default(false)
});