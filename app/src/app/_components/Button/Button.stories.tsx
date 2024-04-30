import { Button } from "./Button";

const Template = () => {
  return <Button label="button" />;
};

export default {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "fullscreen",
  },
};

export const Prototype = () => <Template />;
