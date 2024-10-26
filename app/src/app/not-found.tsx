import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();
  console.log("NotFound");
  return (
    <div>
      <h2>{t('Not Found')}</h2>
      <p>{t('Could not find requested resource')}</p>
      <Link href="/">{t('Return Home')}</Link>
    </div>
  );
}
