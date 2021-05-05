import React from "react";

export interface Test2Props {}

const Test2: React.FC<Test2Props> = () => {
  return (
    <div>
      <input type="text" placeholder="Insert name" />
      <input type="text" placeholder="Insert surname" />
    </div>
  );
};

export default Test2;
