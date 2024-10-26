import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

// TODO: graphqlで定義した型情報を使用する
export interface MockStoreModel {
  id: number;
  name: string;
}

const fetcher = () => {
  return new Promise<MockStoreModel>((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "store 1",
      });
    }, 1000);
  });
};

/**
 * @description Storeモデルの操作を行うカスタムフック
 */
export const useStore = (initialStore?: MockStoreModel) => {
  const { t } = useTranslation();
  const [store, setStore] = React.useState<MockStoreModel | null>(
    initialStore || null
  );
  const [error, setError] = React.useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const store = await fetcher();
        setStore(store);
      } catch (e) {
        setError(true);
      }
    })();
  }, []);

  return {
    store,
    error,
    loading: store === null,
  };
};
