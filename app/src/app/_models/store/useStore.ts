"use client";

import React from "react";
import { GraphQLClient } from "graphql-request";
import { getSdk } from "@/gql/client";
import { ENV } from "@/constants";

export interface StoreModel {
    id: string;
    title: string;
    image?: {
        filePath: string;
        fileExtension: string;
    } | null;
}

/**
 * @description Storeモデルの操作を行うカスタムフック
 */
export const useStore = (initialStore: StoreModel | null = null) => {
    const [store, setStore] = React.useState<StoreModel | null>(initialStore);
    const [error, setError] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(true);

    const createStore = async (title: string, file: File) => {
        const formData = new FormData();
        formData.append("image", file);

        if (
            ENV.ENV === "container" ||
            ENV.ENV === "local" ||
            ENV.ENV === "production"
        ) {
            const response = await fetch(`${ENV.BASE_URL}/blob`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                const graphQLClient = new GraphQLClient(`${ENV.BASE_URL}/graph`);
                const sampleClient = getSdk(graphQLClient);

                try {
                    setLoading(true);
                    const res = await sampleClient.CreateStore({
                        title: title,
                        filePath: data.fileName,
                    });
                    if (res.data.createStore) {
                        setStore(res.data.createStore);
                    }
                } catch (e) {
                    setError(true);
                } finally {
                    setLoading(false);
                }
            }
        }
    }

    return {
        store,
        mutate: {
            createStore,
        },
        error,
        loading,
    };
}

export type UseStore = (
    initialStore?: StoreModel | null
) => ReturnType<typeof useStore>;