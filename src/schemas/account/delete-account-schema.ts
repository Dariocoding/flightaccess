import { z } from 'zod';

export const deleteAccountSchema = z.object({
  statement: z.literal(true)
});

export type DeleteAccountSchema = z.infer<typeof deleteAccountSchema>;
