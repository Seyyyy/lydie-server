import { Select } from "./Select";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Template = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState(t("red"));
  return (
    <Select
      options={[t("red"), t("blue"), t("green")]}
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
