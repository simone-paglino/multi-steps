import React from "react";
// Context
import { MultiStepsContextProvider } from "../../context/MultiStepsContext";
// Components
import MultiSteps from "../MultiSteps/MultiSteps";
import Test1 from "../DummyComponents/Test1";
import Test2 from "../DummyComponents/Test2";

export const App: React.FC = () => {
  return (
    <MultiStepsContextProvider>
      <MultiSteps
        arrTitles={["This is TEST1", "This is TEST2"]}
        steps={[{ componentToRender: Test1 }, { componentToRender: Test2 }]}
      />
    </MultiStepsContextProvider>
  );
};

export default App;
