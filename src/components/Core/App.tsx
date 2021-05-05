import React from "react";
// Context
import { useMultiStepsContext } from "../../context/MultiStepsContext";
// Components
import MultiSteps from "../MultiSteps/MultiSteps";
import Test1 from "../DummyComponents/Test1";
import Test2 from "../DummyComponents/Test2";

const App: React.FC = () => {
  const { getCompleteState } = useMultiStepsContext();

  const showCompleteState = async () => {
    console.log(getCompleteState());
  };

  return (
    <MultiSteps
      arrTitles={["This is TEST1", "This is TEST2"]}
      steps={[
        { componentToRender: <Test1 /> },
        { componentToRender: <Test2 /> },
      ]}
      lastFunction={showCompleteState}
    />
  );
};

export default App;
