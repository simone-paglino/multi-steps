import React, { FC } from "react";
import {
  MultiStepContextProvider,
  useMultiStepContext,
} from "./context/MultiStepContext";
import SingleStep from "./component/SingleStep";

type SingleStepBulletPointProps = {
  isFilled: boolean;
};

const SingleStepBulletPoint: FC<SingleStepBulletPointProps> = ({
  isFilled,
}) => {
  return (
    <div
      style={{
        height: "30px",
        width: "30px",
        borderRadius: "50%",
        border: "1px solid black",
        background: isFilled ? "green" : "transparent",
      }}
    ></div>
  );
};

const StepsBulletPoints: FC = () => {
  const { currentStep, getStepsList } = useMultiStepContext();

  const stepsList = getStepsList();

  const numberOfSteps = stepsList.length;

  return (
    <div style={{ display: "flex" }}>
      {stepsList.map((step, index) => {
        const isLastStep = numberOfSteps - 1 === index;

        return (
          <div key={step} style={{ display: "flex", alignItems: "center" }}>
            <SingleStepBulletPoint isFilled={step < currentStep} />
            {!isLastStep && (
              <span
                style={{
                  display: "inline-block",
                  margin: "0 8px",
                  height: "1px",
                  width: "100px",
                  background: "#000",
                }}
              ></span>
            )}
          </div>
        );
      })}
    </div>
  );
};

const Navigation = () => {
  const { currentStep, goToNextStep, goToPreviousStep } = useMultiStepContext();

  return (
    <div>
      {currentStep > 1 && <button onClick={goToPreviousStep}>PREVIOUS</button>}
      {currentStep < 3 && <button onClick={goToNextStep}>NEXT</button>}
    </div>
  );
};

const InternalComponent: FC = () => {
  return (
    <>
      <StepsBulletPoints />
      <div>
        <SingleStep step={1}>
          <h1>TESTO 1</h1>
        </SingleStep>
        <SingleStep step={2}>
          <h1>TESTO 2</h1>
        </SingleStep>
        <SingleStep step={3}>
          <h1>TESTO 3</h1>
        </SingleStep>
      </div>
      <Navigation />
    </>
  );
};

const App: FC = () => {
  return (
    <MultiStepContextProvider>
      <InternalComponent />
    </MultiStepContextProvider>
  );
};

export default App;
