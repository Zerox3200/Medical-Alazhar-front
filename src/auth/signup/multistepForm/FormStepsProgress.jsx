import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import StepFormButton from "../../components/StepFormButton";
import Typography from "@mui/material/Typography";
import { Link } from "react-router";

const steps = [
  "Personal Details",
  "Academic Details",
  "Internship Details",
  "Identification Documents",
  "Submit",
];

const FormStepsProgress = ({
  activeStep,
  setActiveStep,
  stepComponent,
  handleNextStep,
  isStepValid,
  isValid,
}) => {
  console.log(isValid);
  const [completed, setCompleted] = React.useState({});

  const stepperProps = {
    totalSteps: steps.length,
    completedSteps: Object.keys(completed).length,
    isLastStep: activeStep === steps.length - 1,
    allStepsCompleted: Object.keys(completed).length === steps.length,
  };

  const handleNext = () => {
    handleNextStep();
  };
  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleStep = (step) => () => setActiveStep(step);

  return (
    <Box sx={{ width: "100%" }}>

      <Stepper nonLinear activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit">{label}</StepButton>
          </Step>
        ))}
      </Stepper>

      <div>
        <div className="min-h-[200px] my-4">{stepComponent()}</div>

        <div className="flex items-center gap-4 justify-between">
          <p className="mt-2">
            Already have an email?{" "}
            <Link to="/auth/login" className="text-lightBlue">
              Login
            </Link>
          </p>
          <div className="flex items-center gap-4 justify-end">
            <StepFormButton
              label="Back"
              disabled={activeStep === 0}
              handleClick={handleBack}
              customClass="!bg-flashWhite !border-silverFrost/40 !text-secondary"
            />
            <StepFormButton
              type={
                stepperProps.totalSteps === 5 && isValid ? "submit" : "button"
              }
              handleClick={handleNext}
              label="Next"
              disabled={isStepValid}
            />
          </div>
        </div>
      </div>
    </Box>
  );
};

export default FormStepsProgress;
