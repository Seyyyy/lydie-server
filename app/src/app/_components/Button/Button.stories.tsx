import { Button } from "./Button";

const Template = () => {
  return <Button className="h-9">button</Button>;
};

export default {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "fullscreen",
  },
};

export const Prototype = () => <Template />;
