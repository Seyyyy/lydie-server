"use client";

import { useState } from "react";
import { StoresModel, useStores } from "@/app/_models/store/useStores";

export interface StoresPageProps {
  store?: StoresModel;
}

/**
 * @description StorePageの操作を行うカスタムフック(Humble Object的にテスタブルでない箇所を分離)
 */
export const useStoresPage = (initialStore?: StoresModel) => {
  const {
    stores,
    query,
    error: storeError,
    loading: storeLoading,
  } = useStores(initialStore);
  const [error, setError] = useState<boolean>(false);

  return {
    storesPage: {
      stores,
    },
    error,
    loading: storeLoading,
  };
};
