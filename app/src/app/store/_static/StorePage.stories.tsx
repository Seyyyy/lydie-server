import { StorePage } from "./StorePage";

const Template = () => {
  return (
    <StorePage
      store={{
        id: 1,
        name: "initial store",
      }}
    />
  );
};

export default {
  title: "Page/StorePage",
  component: StorePage,
  parameters: {
    layout: "fullscreen",
  },
};

export const Prototype = () => <Template />;
