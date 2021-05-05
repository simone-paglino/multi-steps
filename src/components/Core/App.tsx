import React from "react";
// Context
import { MultiStepsContextProvider } from "../../context/MultiStepsContext";
// Components
import MultiSteps from "../MultiSteps/MultiSteps";
import Test1 from "../DummyComponents/Test1";
import Test2 from "../DummyComponents/Test2";

const App: React.FC = () => {
  return (
    <MultiStepsContextProvider>
      <MultiSteps
        arrTitles={["This is TEST1", "This is TEST2"]}
        steps={[
          { componentToRender: <Test1 /> },
          { componentToRender: <Test2 /> },
        ]}
        lastFunction={async () => window.alert("THIS IS LAST FUNCTION")}
      />
    </MultiStepsContextProvider>
  );
};

export default App;
