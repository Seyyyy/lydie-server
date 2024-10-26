import { HomePage } from "./HomePage";
import { useImage } from "@/app/_models/image/useImage";
import { useTranslation } from "react-i18next";

const Template = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full h-[800px]">
      <HomePage useImage={useImage} />
    </div>
  );
};

export default {
  title: "Page/HomePage",
  component: HomePage,
};

export const Prototype = () => <Template />;
