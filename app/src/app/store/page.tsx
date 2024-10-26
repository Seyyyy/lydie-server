import { useTranslation } from "react-i18next";

export default function Store() {
  const { t } = useTranslation();
  console.log("Store");
  return (
    <div>
      <p>{t('Store')}</p>
    </div>
  );
}
