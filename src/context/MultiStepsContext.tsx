import React, { createContext, useContext, useState } from "react";

interface ContextProviderValues {
  updateState: (data: any, stepIndex: number) => void;
  registerFunctionsStep: (
    indexStep: number,
    prevFunction?: () => Promise<any | void>,
    checkFunction?: () => Promise<any | void>,
    nextFunction?: () => Promise<any | void>
  ) => void;
  getCurrentFunction: (
    indexFunc: number,
    type: "PREV" | "CHECK" | "NEXT"
  ) => (() => Promise<any | void>) | undefined;
}

interface FunctionsSingleStep {
  prevFunction?: () => Promise<any | void>;
  checkFunction?: () => Promise<any | void>;
  nextFunction?: () => Promise<any | void>;
}

interface SingleGroupFunctions {
  [key: number]: FunctionsSingleStep;
}

const MultiStepsContext = createContext({} as ContextProviderValues);

const MultiStepsContextProvider: React.FC = ({ children }) => {
  const [multiStepState, setMultiStepState] = useState({});
  const [
    functionsStepsState,
    setFunctionsStepsState,
  ] = useState<SingleGroupFunctions>({});

  const updateState = (data: any, stepIndex: number) => {
    const newState = {
      ...multiStepState,
      [stepIndex]: data,
    };

    setMultiStepState(newState);
  };

  const registerFunctionsStep = (
    indexStep: number,
    prevFunction?: () => Promise<any | void>,
    checkFunction?: () => Promise<any | void>,
    nextFunction?: () => Promise<any | void>
  ) => {
    const addedFunction = {
      ...functionsStepsState,
      [indexStep]: {
        prevFunction,
        checkFunction,
        nextFunction,
      },
    };

    setFunctionsStepsState(addedFunction);
  };

  const getCurrentFunction = (
    indexFunc: number,
    type: "PREV" | "CHECK" | "NEXT"
  ): (() => Promise<any | void>) | undefined => {
    if (functionsStepsState[indexFunc]) {
      if (type === "PREV") {
        return functionsStepsState[indexFunc].prevFunction;
      } else if (type === "CHECK") {
        return functionsStepsState[indexFunc].checkFunction;
      } else if (type === "NEXT") {
        return functionsStepsState[indexFunc].nextFunction;
      }
    } else {
      return undefined;
    }
  };

  return (
    <MultiStepsContext.Provider
      value={{ updateState, registerFunctionsStep, getCurrentFunction }}
    >
      {children}
    </MultiStepsContext.Provider>
  );
};

const useMultiStepsContext = () => {
  const context = useContext(MultiStepsContext);
  return { ...context };
};

export { MultiStepsContextProvider, useMultiStepsContext };
