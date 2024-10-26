import { StorePage } from "./StorePage";
import { useTranslation } from "react-i18next";

const Template = () => {
  const { t } = useTranslation();
  return (
    <StorePage
      store={{
        id: 1,
        name: t("initial store"),
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
