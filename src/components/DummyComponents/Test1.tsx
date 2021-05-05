import React, { useEffect } from "react";
// Context
import { useMultiStepsContext } from "../../context/MultiStepsContext";

export interface Test1Props {
  customText?: string;
}

const Test1: React.FC<Test1Props> = ({ customText }) => {
  const { registerFunctionsStep } = useMultiStepsContext();

  const greetingsTEST1 = async () => {
    console.log("HELLO FROM TEST1!!!");
  };

  const checkValueForNext = async () => {
    return true;
  };

  useEffect(() => {
    registerFunctionsStep(0, undefined, checkValueForNext, greetingsTEST1);
  }, []);

  return (
    <div>
      {customText ? <h3>{customText}</h3> : null}
      <input type="email" placeholder="Insert email" />
      <input type="password" placeholder="Insert password" />
    </div>
  );
};

export default Test1;
