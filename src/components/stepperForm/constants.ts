export const Steps = {
  stepOne: "stepOne",
  stepTwo: "stepTwo",
} as const;

export const steps = [Steps.stepOne, Steps.stepTwo] as const;

export type StepKey = (typeof steps)[number];
