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

const steps = ["stepOne", "stepTwo"] as const;

const Stepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const form = useAppForm({
    defaultValues: {
      stepOne: { phone: "", fullName: "" },
      stepTwo: { email: "", zip: "" },
    },
    validators: { onChange: stepperSchema },
    onSubmit: ({ value }) => {
      console.log("Submitted:", value);
    },
  });

  const currentStepKey = steps[activeStep];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}>
      <Box sx={{ width: "80%", mt: 4 }}>
        <MuiStepper activeStep={activeStep}>
          {steps.map((step, index) => (
            <Step key={step}>
              <StepLabel>{`Step ${index + 1}`}</StepLabel>
            </Step>
          ))}
        </MuiStepper>

        {currentStepKey === "stepOne" && (
          <StepOne form={form} fields="stepOne" />
        )}
        {currentStepKey === "stepTwo" && (
          <StepTwo form={form} fields="stepTwo" />
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
          {activeStep < steps.length - 1 && (
            <Button onClick={handleNext}>Next</Button>
          )}

          {activeStep === steps.length - 1 && (
            <form.Subscribe selector={(state) => state.isSubmitting}>
              {(isSubmitting) => (
                <Button disabled={isSubmitting} type="submit">
                  Submit
                </Button>
              )}
            </form.Subscribe>
          )}
        </Box>
      </Box>
    </form>
  );
};

export default Stepper;
