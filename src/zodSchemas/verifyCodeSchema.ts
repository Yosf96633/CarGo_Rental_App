import { z } from "zod";

export const verifyCodeSchema = z.object({
  code: z
    .string()
    .min(6, { message: `Verification code must be greater than 6 numbers` }),
});
