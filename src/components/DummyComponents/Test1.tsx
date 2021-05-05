import React, { useEffect } from "react";
// Context
import { useMultiStepsContext } from "../../context/MultiStepsContext";

export interface Test1Props {}

const Test1: React.FC<Test1Props> = () => {
  const { registerFunctionsStep } = useMultiStepsContext();

  const greetingsTEST1 = async () => {
    console.log("HELLO FROM TEST1!!!");
  };

  useEffect(() => {
    console.log("useffect");
    registerFunctionsStep(0, undefined, undefined, greetingsTEST1);
  }, []);

  return (
    <div>
      <input type="email" placeholder="Insert email" />
      <input type="password" placeholder="Insert password" />
    </div>
  );
};

export default Test1;
