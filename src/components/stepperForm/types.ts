import { z } from "zod";

import { stepOneSchema, stepTwoSchema } from "../../schemas/stepperSchema";
import { Steps } from "./constants";

export type FormValues = {
  [Steps.stepOne]: z.infer<typeof stepOneSchema>;
  [Steps.stepTwo]: z.infer<typeof stepTwoSchema>;
};

export type ValidationError = {
  fields: Record<string, string>;
};
