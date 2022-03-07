import React from "react";

import "./appStepper.css";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";

export interface AppStepperProps {
  steps: number;
  currentStepTuple: [number, React.Dispatch<React.SetStateAction<number>>];
  disabledNext: boolean;
}

export const AppStepper = ({
  steps,
  currentStepTuple: [currentStep, setCurrentStep],
  disabledNext,
}: AppStepperProps): JSX.Element => {
  return (
    <MobileStepper
      variant="dots"
      steps={steps}
      position="static"
      activeStep={currentStep}
      nextButton={
        <Button
          disabled={currentStep === steps - 1 || disabledNext}
          type="button"
          onClick={() =>
            setCurrentStep((prev) => {
              if (prev < steps - 1) {
                return prev + 1;
              }
              return prev;
            })
          }
        >
          Next
        </Button>
      }
      backButton={
        <Button
          disabled={currentStep === 0}
          onClick={() =>
            setCurrentStep((prev) => {
              if (prev > 0) {
                return prev - 1;
              }
              return prev;
            })
          }
        >
          Back
        </Button>
      }
      className="app-stepper"
    />
  );
};
