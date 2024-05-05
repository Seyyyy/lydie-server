import sharp from "sharp";
import fs from "fs";
import { Resolvers } from "@/gql/server";
import { Image } from "lydie";
import { ENV } from "@/constants";

export const resolvers: Resolvers = {
  Query: {
    analyzeImage: async (_parent, args, _context, _info) => {
      const result = await analyzeImage(args.fileName);
      return {
        hue_chromatic: result.hue_chromatic,
        hue_gray: result.hue_gray,
        saturation: result.saturation,
        value: result.value,
        entropy: {
          hue_chromatic: result.entropy.hue_chromatic,
          hue_gray: result.entropy.hue_gray,
          saturation: result.entropy.saturation,
          value: result.entropy.value,
        },
      };
    },
  },
};

export const analyzeImage = async (fileName: string) => {
  const filePath = `${ENV.BASE_OBJECT_PATH}/${ENV.TEMP_OBJECT_PATH}/${fileName}`;
  const file = fs.readFileSync(`${filePath}`);

  if (file) {
    const buffer = Buffer.from(file);

    // 画像分析
    const { data, info } = await sharp(buffer)
      .raw()
      .toBuffer({ resolveWithObject: true });
    const { hsv } = bufferTohsv(data);

    const image = new Image(hsv, info.width, info.height);
    const hsbRate = image.get_usage_rate();
    const entropy = image.get_entropy();

    // ファイル削除
    fs.unlinkSync(filePath);

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
  } else {
    throw new Error("Invalid file type");
  }
};

const bufferTohsv = (imageBuffer: Buffer) => {
  const hsvArray = [];

  for (let i = 0; i < imageBuffer.length; i += 3) {
    const r = imageBuffer[i];
    const g = imageBuffer[i + 1];
    const b = imageBuffer[i + 2];

    // Convert RGB to HSV
    const hsv = rgb2hsv(r, g, b);

    hsvArray.push(...hsv);
  }

  return {
    hsv: hsvArray,
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
