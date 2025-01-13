import React, { useEffect } from "react";
import { GraphQLClient } from "graphql-request";
import { getSdk } from "@/gql/client";
import { ENV } from "@/constants";

interface StoreModel {
  id: string;
  title: string;
  image?: {
    filePath: string;
    fileExtension: string;
  } | null;
}

export type StoresModel = Array<StoreModel>;

/**
 * @description Storeモデルの操作を行うカスタムフック
 */
export const useStores = (initialStore: StoresModel = []) => {
  const [stores, setStores] = React.useState<StoresModel>(initialStore);
  const [error, setError] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  // 初期化時にindexStoresを呼び出してstoresステートに格納していく
  useEffect(() => {
    (async () => {
      await indexStores(1, 10);
    })();
  }, []);

  const indexStores = async (page: number, pageSize: number) => {
    const graphQLClient = new GraphQLClient(`${ENV.BASE_URL}/graph`);
    const sampleClient = getSdk(graphQLClient);

    try {
      setLoading(true);
      const res = await sampleClient.IndexStores({ page, pageSize });
      if (res.data.indexStores) {
        res.data.indexStores
        setStores(res.data.indexStores);
      }
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return {
    stores,
    query: {
      indexStores
    },
    error,
    loading,
  };
};
