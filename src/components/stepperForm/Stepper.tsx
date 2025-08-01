import { useState, Fragment } from "react";
import {
  Box,
  Button,
  Stepper as MuiStepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import { useForm } from "@tanstack/react-form";

const Stepper = ({ steps }: { steps: string[] }) => {
  const [activeStep, setActiveStep] = useState(0);

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
    validators: {
      // DEMO: You can switch between schemas seamlessly
      //   onChange: ZodSchema,
      // onChange: ValibotSchema,
      // onChange: ArkTypeSchema,
      // onChange: EffectSchema,
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
    },
  });

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}>
      <Box sx={{ width: "80%" }}>
        <MuiStepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </MuiStepper>

        {activeStep === steps.length ? (
          <Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you're finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </Fragment>
        ) : (
          <Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}>
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </Fragment>
        )}
      </Box>
    </form>
  );
};

export default Stepper;
