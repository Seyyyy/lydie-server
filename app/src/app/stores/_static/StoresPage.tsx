"use client";

import { StoresPageProps, useStoresPage } from "./useStoresPage";
import Image from 'next/image';
import Link from 'next/link';

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
    <div className="container mx-auto px-2 pt-[62px]">
      <ul className="grid grid-cols-2 gap-1">
        {
          storesPage.stores.map((store) => {
            return (
              <li key={store.id} className="relative w-full aspect-square group">
                <Link href={`/stores/${store.id}`} passHref>
                  {store.image && (
                    <Image src={store.image.filePath} alt={store.title} fill className="object-cover rounded-lg" />
                  )}
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  )
};
