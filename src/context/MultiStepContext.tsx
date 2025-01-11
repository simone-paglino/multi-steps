import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type MultiStepContextProps = {
  currentStep: number;
  getStepsList: () => Array<number>;
  goToNextStep: VoidFunction;
  goToPreviousStep: VoidFunction;
  goToStep: (step: number) => void;
  registerStep: (step: number) => void;
};

const defaultContext: MultiStepContextProps = {
  currentStep: -1,
  getStepsList: () => [],
  goToNextStep: () => {},
  goToPreviousStep: () => {},
  goToStep: (step: number) => {},
  registerStep: (step: number) => {},
};

export const MultiStepContext =
  createContext<MultiStepContextProps>(defaultContext);

type MultiStepContextProviderProps = {
  children: ReactNode;
};

export const MultiStepContextProvider: FC<MultiStepContextProviderProps> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState(defaultContext.currentStep);
  const [stepsList, setStepsList] = useState<Array<number>>([]);

  useEffect(() => {
    const firstStep = stepsList?.[0] ?? -1;

    if (currentStep !== firstStep) {
      setCurrentStep(firstStep);
    }
  }, [stepsList.length]);

  const registerStep = (stepIndex: number) => {
    if (stepsList.some((step) => step === stepIndex)) {
      return;
    }

    setStepsList((previousState) => {
      const updatedStepsList = [...previousState, stepIndex].sort(function (
        a,
        b
      ) {
        return a - b;
      });

      return updatedStepsList;
    });
  };

  const getStepsList = () => stepsList;

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const goToNextStep = () => {
    setCurrentStep((previousStep) => previousStep + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep((previousStep) => previousStep - 1);
  };

  return (
    <MultiStepContext.Provider
      value={{
        currentStep,
        getStepsList,
        goToNextStep,
        goToPreviousStep,
        goToStep,
        registerStep,
      }}
    >
      {children}
    </MultiStepContext.Provider>
  );
};

export const useMultiStepContext = (): MultiStepContextProps => {
  return useContext(MultiStepContext);
};
