"use client";

import { StorePageProps, useStorePage } from "./useStorePage";

export const StorePage = (props: StorePageProps) => {
  const { storePage, error, loading } = useStorePage(props.store);

  if (error) {
    return <div>Error!</div>;
  }

  if (storePage === null) {
    return <div>Loading...</div>;
  }

  if (storePage.store === null) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header>
        <h1>{storePage.store.name}</h1>
      </header>
    </div>
  );
};
