"use client";

import React from "react";
import { Image as LImage } from "lydie";

// TODO: graphqlで定義した型情報を使用する
export interface MockImageModel {
  id: number;
  name: string;
}

/**
 * @description Imageモデルの操作を行うカスタムフック
 */
export const useImage = (initialImage?: MockImageModel) => {
  const [image, _] = React.useState<MockImageModel | null>(
    initialImage || null
  );
  const [error, setError] = React.useState<boolean>(false);

  const analyzeImage = async (file: File) => {
    try {
      const data = await fileTohsv(file);
      const result = analyzeImageForClient(
        data.hsvArray,
        data.width,
        data.height
      );
      return result;
    } catch (e) {
      setError(true);
      return null;
    }
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

export type UseImage = (
  initialImage?: MockImageModel
) => ReturnType<typeof useImage>;

const fileTohsv = (
  file: File
): Promise<{ hsvArray: number[]; width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    const url = URL.createObjectURL(file);
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Unable to get 2d context");
      }
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const data = imageData.data;
      const hsvArray: number[] = [];
      for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];
        const ar = rgb2hsv(r, g, b);
        hsvArray.push(ar[0]);
        hsvArray.push(ar[1]);
        hsvArray.push(ar[2]);
      }

      URL.revokeObjectURL(url);
      resolve({ hsvArray, width: img.width, height: img.height });
    };
    img.onerror = (error) => {
      reject(error);
    };
  });
};

const analyzeImageForClient = (
  hsvList: number[],
  width: number,
  height: number
) => {
  const image = new LImage(hsvList, width, height);
  const hsbRate = image.get_usage_rate();
  const entropy = image.get_entropy();

  return {
    hue_chromatic: hsbRate.hue_chromatic,
    hue_gray: hsbRate.hue_gray,
    saturation: hsbRate.saturation,
    value: hsbRate.brightness,
    entropy: {
      hue_chromatic: entropy.hue_chromatic,
      hue_gray: entropy.hue_gray,
      saturation: entropy.saturation,
      value: entropy.brightness,
    },
  };
};

const rgb2hsv = (r: number, g: number, b: number): number[] => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  let v = max;
  const d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max === min) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  v = Math.round(v * 100);
  return [h, s, v];
};
