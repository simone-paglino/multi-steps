import React, { useState } from "react";
// Context
import { useMultiStepsContext } from "../../context/MultiStepsContext";

export interface SingleStepProps {
  componentToRender: React.FC;
}

export interface MultiStepsProps {
  title?: string;
  arrTitles?: Array<string>;
  steps: Array<SingleStepProps>;
  lastFunction?: () => Promise<any | void>;
}

const MultiSteps: React.FC<MultiStepsProps> = ({
  title,
  arrTitles,
  steps,
  lastFunction,
}) => {
  const [currentStepState, setCurrentStepState] = useState(0);

  const { getCurrentFunction } = useMultiStepsContext();

  const handleNextButton = async () => {
    if (currentStepState === steps.length - 1) {
      if (lastFunction && typeof lastFunction === "function") {
        // TODO: check this problem
        await lastFunction();
      }
    } else {
      const fnCheck = getCurrentFunction(currentStepState, "CHECK");

      let nextStep = true;

      if (fnCheck) {
        nextStep = await fnCheck();
      }
      if (nextStep) {
        if (nextStep) {
          const fnNext = getCurrentFunction(currentStepState, "NEXT");

          if (fnNext) {
            await fnNext();
          }
          console.log("after next step");
          setCurrentStepState(currentStepState + 1);
        }
      }
    }
  };

  const handlePrevButton = async () => {
    if (currentStepState > 0) {
      setCurrentStepState(currentStepState - 1);
    }
  };

  const getTitle = () => {
    if (title) {
      return <h2>{title}</h2>;
    } else if (arrTitles && Array.isArray(arrTitles)) {
      return <h2>{arrTitles[currentStepState]}</h2>;
    } else {
      return null;
    }
  };

  const getComponentToRender = () => {
    // TODO: Test this function if the user wants to pass a components with props
    return steps[currentStepState].componentToRender();
  };

  return (
    <div>
      {getTitle()}
      <p>Header steps</p>
      {getComponentToRender()}
      {currentStepState > 0 ? (
        <button onClick={handlePrevButton}>Previous</button>
      ) : null}

      {currentStepState < steps.length ? (
        <button onClick={handleNextButton}>Next</button>
      ) : null}
    </div>
  );
};

export default MultiSteps;
