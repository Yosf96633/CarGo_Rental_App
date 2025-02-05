import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(4, `Username must be greater than 4 characters`)
  .max(20, `Username must be less than 20 characters`)
  .regex(
    /^[a-zA-Z0-9_]{4,20}$/,
    `Username must not contain special characters`
  );

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: `Please enter valid email`}),
  password: z.string().min(6, `Password must be greater than 6 characters`),
});

export type signUpSchemaInput = z.infer<typeof signUpSchema>;
