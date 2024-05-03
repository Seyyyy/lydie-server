import { Select } from "./Select";
import { useState } from "react";

const Template = () => {
  const [value, setValue] = useState("red");
  return (
    <Select
      options={["red", "blue", "green"]}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      className="w-full h-full"
    />
  );
};

export default {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "fullscreen",
  },
};

export const Prototype = () => <Template />;
