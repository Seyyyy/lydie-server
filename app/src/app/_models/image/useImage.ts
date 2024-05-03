import React, { useEffect } from "react";
import { ENV } from "@/constants";

// TODO: graphqlで定義した型情報を使用する
export interface MockImageModel {
  id: number;
  name: string;
}

const fetcher = () => {
  return new Promise<MockImageModel>((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "image 1",
      });
    }, 1000);
  });
};

/**
 * @description Imageモデルの操作を行うカスタムフック
 */
export const useImage = (initialImage?: MockImageModel) => {
  const [image, setImage] = React.useState<MockImageModel | null>(
    initialImage || null
  );
  const [error, setError] = React.useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const image = await fetcher();
        setImage(image);
      } catch (e) {
        setError(true);
      }
    })();
  }, []);

  const analyzeImage = async (file: File) => {
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
    }

    return [""];
  };

  return {
    image,
    mutate: {
      analyzeImage,
    },
    error,
    loading: image === null,
  };
};
