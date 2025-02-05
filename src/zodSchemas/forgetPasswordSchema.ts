import { z } from "zod";

export const forgetPasswordSchema = z.object({
  code: z
    .number()
    .min(6, { message: `Verification code must be greater than 6 numbers` }),
});
