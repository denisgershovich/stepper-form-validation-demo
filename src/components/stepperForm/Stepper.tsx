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
import { stepperSchema } from "../../schemas/stepperSchema";
import { steps, Steps } from "./constants";

const Stepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const form = useAppForm({
    defaultValues: {
      [Steps.stepOne]: { phone: "", fullName: "" },
      [Steps.stepTwo]: { email: "", zip: "" },
    },
    validators: { onChange: stepperSchema },
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

  const currentStep = steps[activeStep];

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

          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button
                onClick={!isLastStep ? handleNext : undefined}
                type={isLastStep ? "submit" : "button"}
                disabled={isLastStep && isSubmitting}>
                {isLastStep ? "Submit" : "Next"}
              </Button>
            )}
          </form.Subscribe>
        </Box>
      </Box>
    </form>
  );
};

export default Stepper;
