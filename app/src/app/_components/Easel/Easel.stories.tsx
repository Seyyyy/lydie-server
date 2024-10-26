import { useState } from "react";
import { Easel } from "./Easel";
import { useTranslation } from "react-i18next";

const Template = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  return (
    <Easel
      className="w-96 h-96"
      onChange={handleChangeImage}
      src={file ? URL.createObjectURL(file) : ""}
      aria-label={t('Upload image')}
    />
  );
};

export default {
  title: "Components/Easel",
  component: Easel,
  parameters: {
    layout: "fullscreen",
  },
};

export const Prototype = () => <Template />;
