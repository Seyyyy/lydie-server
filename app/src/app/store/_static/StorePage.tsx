"use client";

import { StorePageProps, useStorePage } from "./useStorePage";
import { useTranslation } from "react-i18next";

export const StorePage = (props: StorePageProps) => {
  const { storePage, error, loading } = useStorePage(props.store);
  const { t } = useTranslation();

  if (error) {
    return <div>{t('Error!')}</div>;
  }

  if (storePage === null) {
    return <div>{t('Loading...')}</div>;
  }

  if (storePage.store === null) {
    return <div>{t('Loading...')}</div>;
  }

  if (loading) {
    return <div>{t('Loading...')}</div>;
  }

  return (
    <div>
      <header>
        <h1>{storePage.store.name}</h1>
      </header>
    </div>
  );
};
