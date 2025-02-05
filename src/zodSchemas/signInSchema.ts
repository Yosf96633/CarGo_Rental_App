import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email({ message: `Please enter valid email` }),
  password: z.string().min(6, `Password must be greater than 6 characters`),
});

export type signInSchemaInput = z.infer<typeof signInSchema>;
