import { stepSchemas } from "../../schemas/stepperSchema";
import type { StepKey } from "./constants";
import type { FormValues, ValidationError } from "./types";

export const validateStep = (
  stepKey: StepKey,
  value: FormValues,
): ValidationError | null => {
  console.log("🚀 ~ validateStep ~ stepKey:", stepKey);
  const stepData = value[stepKey];
  const result = stepSchemas[stepKey].safeParse(stepData);

  if (result.success) return null;

  const errors: ValidationError = { fields: {} };
  for (const issue of result.error.issues) {
    const path = issue.path.join(".");
    errors.fields[`${stepKey}.${path}`] = issue.message;
  }

  return errors;
};

export const isStepValid = (stepKey: StepKey, values: FormValues): Boolean =>
  stepSchemas[stepKey].safeParse(values[stepKey]).success;
