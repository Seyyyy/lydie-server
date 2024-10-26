"use client";

import { useState } from "react";
import { MockStoreModel, useStore } from "@/app/_models/store/useStore";
import { useTranslation } from "react-i18next";

export interface StorePageProps {
  store?: MockStoreModel;
}

/**
 * @description StorePageの操作を行うカスタムフック(Humble Object的にテスタブルでない箇所を分離)
 */
export const useStorePage = (initialStore?: MockStoreModel) => {
  const {
    store,
    error: storeError,
    loading: storeLoading,
  } = useStore(initialStore);
  const [error, setError] = useState<boolean>(false);
  const { t } = useTranslation();

  return {
    storePage: {
      store,
    },
    error,
    loading: storeLoading,
  };
};
