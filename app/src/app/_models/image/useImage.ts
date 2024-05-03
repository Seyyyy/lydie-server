import React, { useEffect } from "react";

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
