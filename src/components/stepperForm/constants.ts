export const Steps = {
  stepOne: "stepOne",
  stepTwo: "stepTwo",
  confirmation: "Confirmation",
} as const;

export const steps = [
  Steps.stepOne,
  Steps.stepTwo,
  Steps.confirmation,
] as const;

export type StepKey = (typeof steps)[number];
