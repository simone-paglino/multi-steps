import React, { useEffect, useRef } from "react";
// Context
import { useMultiStepsContext } from "../../context/MultiStepsContext";

export interface Test1Props {
  customText?: string;
}

const Test1: React.FC<Test1Props> = ({ customText }) => {
  const { registerFunctionsStep, updateState } = useMultiStepsContext();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const greetingsTEST1 = async () => {
    console.log("HELLO FROM TEST1!!!");
  };

  const checkValueForNext = async (): Promise<boolean> => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (email && password) {
      updateState({ email, password }, 0);
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    registerFunctionsStep(0, undefined, checkValueForNext, greetingsTEST1);
  }, []);

  return (
    <div>
      {customText ? <h3>{customText}</h3> : null}
      <input ref={emailRef} type="email" placeholder="Insert email" />
      <input ref={passwordRef} type="password" placeholder="Insert password" />
    </div>
  );
};

export default Test1;
