import { useState, type FC } from "react";

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
import ConfirmationStep from "./steps/ConfirmationStep";
import { StepThree } from "./steps/stepThree";

const stepComponents: Record<StepKey, FC<{ form: any; fields: StepKey }>> = {
  [Steps.stepOne]: StepOne,
  [Steps.stepTwo]: StepTwo,
  [Steps.StepThree]: StepThree,
  [Steps.confirmation]: ConfirmationStep,
};

const Stepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = steps[activeStep];

  const form = useAppForm({
    defaultValues: defaultFormValues,
    validators: {
      onChange: ({ value }) => validateStep(currentStep, value),
    },
    onSubmit: () => {
      setActiveStep((prev) => prev + 1);
    },
  });

  const handleNext = () => {
    setActiveStep((step) => step + 1);
  };

  const handleBack = () => {
    setActiveStep((step) => step - 1);
  };

  const resetStepper = () => {
    setActiveStep(0);
    form.reset();
  };

  const StepComponent = stepComponents[currentStep];

  const isLastStep = activeStep === steps.length - 1;
  const isConfirmationStep = currentStep === Steps.confirmation;

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
          {isConfirmationStep && (
            <Button variant="contained" onClick={resetStepper}>
              Reset
            </Button>
          )}

          {!isConfirmationStep && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}>
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
          )}
        </Box>
      </Box>
    </form>
  );
};

export default Stepper;
