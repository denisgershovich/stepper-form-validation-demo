export const Steps = {
  stepOne: "stepOne",
  stepTwo: "stepTwo",
  StepThree: "StepThree",
  confirmation: "Confirmation",
} as const;

export const steps = [
  Steps.stepOne,
  Steps.stepTwo,
  Steps.StepThree,
  Steps.confirmation,
] as const;

export type StepKey = (typeof steps)[number];
