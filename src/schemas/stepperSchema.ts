import { z } from "zod";

export const stepOneSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(2, "Phone must be at least 2 digits"),
});

export const stepTwoSchema = z.object({
  email: z.string().min(2, "email name is required"),
  zip: z.string().min(2, "ZIP code must be25 digits"),
});

export const stepperSchema = z.object({
  stepOne: stepOneSchema,
  stepTwo: stepTwoSchema,
});

export type StepperValues = z.infer<typeof stepperSchema>;
