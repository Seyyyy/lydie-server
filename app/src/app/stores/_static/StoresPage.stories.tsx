import { StoresPage } from "./StoresPage";

const Template = () => {
  return (
    <StoresPage
      store={[{
        id: "1",
        title: "initial store",
      }]}
    />
  );
};

export default {
  title: "Page/StorePage",
  component: StoresPage,
  parameters: {
    layout: "fullscreen",
  },
};

export const Prototype = () => <Template />;
