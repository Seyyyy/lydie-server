import { Button } from "./Button";
import { useTranslation } from "react-i18next";

const Template = () => {
  const { t } = useTranslation();
  return <Button className="h-9">{t('button')}</Button>;
};

export default {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "fullscreen",
  },
};

export const Prototype = () => <Template />;
