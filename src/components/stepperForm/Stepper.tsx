import { useState } from "react";

import {
  Box,
  Button,
  Stepper as MuiStepper,
  Step,
  StepLabel,
} from "@mui/material";

import { useAppForm } from "../../hooks/form";
import { StepOne } from "./steps/StepOne";
import { StepTwo } from "./steps/StepTwo";
import {
  stepOneSchema,
  stepSchemas,
  stepTwoSchema,
} from "../../schemas/stepperSchema";
import { steps, Steps, type StepKey } from "./constants";
import type z from "zod";

const Stepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = steps[activeStep];

  const form = useAppForm({
    defaultValues: {
      [Steps.stepOne]: { phone: "", fullName: "" },
      [Steps.stepTwo]: { email: "", zip: "" },
    },
    validators: {
      onChange: ({ value }) => validateStep(currentStep, value),
    },
    onSubmit: ({ value }) => {
      console.log("Submitted:", value);
    },
  });

  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) return;
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (isFirstStep) return;

    setActiveStep((prev) => prev - 1);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}>
      <Box sx={{ width: "80%", mt: 4 }}>
        <MuiStepper activeStep={activeStep}>
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </MuiStepper>

        {currentStep === Steps.stepOne && (
          <StepOne form={form} fields={Steps.stepOne} />
        )}
        {currentStep === Steps.stepTwo && (
          <StepTwo form={form} fields={Steps.stepTwo} />
        )}

        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}>
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />

          <form.Subscribe selector={(state) => ({ values: state.values })}>
            {({ values }) => {
              const isValid = isStepValid(currentStep, values);

              return (
                <Button
                  onClick={!isLastStep ? handleNext : undefined}
                  type={isLastStep ? "submit" : "button"}
                  disabled={
                    (isLastStep && form.state.isSubmitting) || !isValid
                  }>
                  {isLastStep ? "Submit" : "Next"}
                </Button>
              );
            }}
          </form.Subscribe>
        </Box>
      </Box>
    </form>
  );
};

type FormValues = {
  [Steps.stepOne]: z.infer<typeof stepOneSchema>;
  [Steps.stepTwo]: z.infer<typeof stepTwoSchema>;
};

type ValidationError = {
  fields: Record<string, string>;
};

const validateStep = (
  stepKey: StepKey,
  value: FormValues,
): ValidationError | null => {
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

function isStepValid(step: keyof typeof stepSchemas, values: any) {
  const result = stepSchemas[step].safeParse(values[step]);
  return result.success;
}

export default Stepper;
