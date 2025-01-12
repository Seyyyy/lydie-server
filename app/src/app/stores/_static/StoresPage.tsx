"use client";

import { StoresPageProps, useStoresPage } from "./useStoresPage";

export const StoresPage = (props: StoresPageProps) => {
  const { storesPage, error, loading } = useStoresPage(props.store);

  if (error) {
    return <div>Error!</div>;
  }

  if (storesPage === null) {
    return <div>Loading...</div>;
  }

  if (storesPage.stores === null) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {
        storesPage.stores.map((store) => {
          return (
            <div key={store.id}>
              <h1>{store.title}</h1>
            </div>
          );
        })
      }
    </div>
  );
};
