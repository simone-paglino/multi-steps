import React, { FC, ReactNode, useEffect } from "react";
import { useMultiStepContext } from "../context/MultiStepContext";

type SingleStepProps = {
  children: ReactNode;
  step: number;
};

const SingleStep: FC<SingleStepProps> = ({ children, step }) => {
  const { currentStep, registerStep } = useMultiStepContext();

  useEffect(() => {
    registerStep(step);
  }, [step]);

  if (currentStep !== step) {
    return null;
  }

  return <>{children}</>;
};

export default SingleStep;
