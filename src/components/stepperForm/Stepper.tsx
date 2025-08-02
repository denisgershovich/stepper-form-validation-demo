import { useCallback, useState, type FC } from "react";

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
import { steps, Steps, type StepKey } from "./constants";
import { defaultFormValues } from "./defaults";
import { isStepValid, validateStep } from "./helpers";

const stepComponents: Record<StepKey, FC<{ form: any; fields: StepKey }>> = {
  [Steps.stepOne]: StepOne,
  [Steps.stepTwo]: StepTwo,
};

const Stepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = steps[activeStep];

  const form = useAppForm({
    defaultValues: defaultFormValues,
    validators: {
      onChange: ({ value }) => validateStep(currentStep, value),
    },
    onSubmit: ({ value }) => {
      console.log("Submitted:", value);
    },
  });

  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === steps.length - 1;

  const handleNext = useCallback(() => {
    if (!isLastStep) setActiveStep((step) => step + 1);
  }, [isLastStep]);

  const handleBack = useCallback(() => {
    if (!isFirstStep) setActiveStep((step) => step - 1);
  }, [isFirstStep]);

  const StepComponent = stepComponents[currentStep];

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit();
      }}
      style={{ width: "100%", maxWidth: 600 }}>
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 3,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}>
        <MuiStepper activeStep={activeStep} alternativeLabel>
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </MuiStepper>

        <StepComponent form={form} fields={currentStep} />

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button
            variant="outlined"
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}>
            Back
          </Button>

          <form.Subscribe selector={(state) => ({ values: state.values })}>
            {({ values }) => {
              const isValid = isStepValid(currentStep, values);

              return (
                <Button
                  variant="contained"
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

export default Stepper;
