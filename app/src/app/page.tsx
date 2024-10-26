import { HomePage } from "./_static/HomePage";
import { useImage } from "@/app/_models/image/useImage";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  return <HomePage useImage={useImage} />;
}
