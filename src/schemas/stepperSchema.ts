import { z } from "zod";

import { Steps, type StepKey } from "../components/stepperForm/constants";

export const stepOneSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .refine((val) => /^\d+$/.test(val), {
      message: "Phone must contain only numbers",
    }),
});

export const stepTwoSchema = z.object({
  email: z.string().email("Invalid email address"),
  zip: z
    .string()
    .min(5, "ZIP code must be at least 5 digits")
    .refine((val) => /^\d{5,}$/.test(val), {
      message: "ZIP must contain only digits",
    }),
});

export const stepSchemas: Record<StepKey, z.ZodObject<any>> = {
  [Steps.stepOne]: stepOneSchema,
  [Steps.stepTwo]: stepTwoSchema,
};
