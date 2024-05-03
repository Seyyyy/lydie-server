// import sharp from "sharp";
import fs from "fs";
// import path from "path";
import crypto from "crypto";
import { ENV } from "@/constants";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  const image = (await request.formData()).get("image") as Blob;

  if (image) {
    const buffer = Buffer.from(await image.arrayBuffer());

    // 画像分析
    // const { data, info } = await sharp(buffer)
    //   .raw()
    //   .toBuffer({ resolveWithObject: true });
    // const { hsv } = bufferTohsv(data);
    // console.log(hsv);
    // console.log(info);

    // file(画像データ)をファイルシステムに保存する
    const type = image.type.split("/")[1];

    // 画像ファイル(png, jpeg, jpg)以外はエラー
    if (type !== "png" && type !== "jpeg" && type !== "jpg") {
      return new Response(
        JSON.stringify({
          message: "Invalid file type",
        }),
        {
          status: 400,
          headers: { "content-type": "application/json" },
        }
      );
    }

    let fileName = crypto.randomBytes(16).toString("hex") + "." + type;
    if (ENV.ENV === "local") {
      // テスト時はクリーンアップのためにファイル名を固定
      fileName = "test.png";
    }
    if (!fs.existsSync(`${ENV.BASE_OBJECT_PATH}/${ENV.TEMP_OBJECT_PATH}`)) {
      fs.mkdirSync(`${ENV.BASE_OBJECT_PATH}/${ENV.TEMP_OBJECT_PATH}`);
    }

    const filePath = `${ENV.BASE_OBJECT_PATH}/${ENV.TEMP_OBJECT_PATH}/${fileName}`;
    await fs.writeFileSync(filePath, buffer);

    return new Response(
      JSON.stringify({
        filePath: `${ENV.BASE_OBJECT_PATH}/${ENV.TEMP_OBJECT_PATH}/${fileName}`,
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  } else {
    return new Response(
      JSON.stringify({
        message: "Invalid file type",
      }),
      {
        status: 400,
        headers: { "content-type": "application/json" },
      }
    );
  }
}

// const bufferTohsv = (imageBuffer: Buffer) => {
//   const hsvArray = [];

//   for (let i = 0; i < imageBuffer.length; i += 3) {
//     const r = imageBuffer[i];
//     const g = imageBuffer[i + 1];
//     const b = imageBuffer[i + 2];

//     // Convert RGB to HSV
//     const hsv = rgb2hsv(r, g, b);

//     hsvArray.push(...hsv);
//   }

//   return {
//     hsv: hsvArray,
//   };
// };

// const rgb2hsv = (r: number, g: number, b: number): number[] => {
//   r /= 255;
//   g /= 255;
//   b /= 255;
//   const max = Math.max(r, g, b);
//   const min = Math.min(r, g, b);
//   let h = 0;
//   let s = 0;
//   let v = max;
//   const d = max - min;
//   s = max === 0 ? 0 : d / max;
//   if (max === min) {
//     h = 0;
//   } else {
//     switch (max) {
//       case r:
//         h = (g - b) / d + (g < b ? 6 : 0);
//         break;
//       case g:
//         h = (b - r) / d + 2;
//         break;
//       case b:
//         h = (r - g) / d + 4;
//         break;
//     }
//     h /= 6;
//   }
//   h = Math.round(h * 360);
//   s = Math.round(s * 100);
//   v = Math.round(v * 100);
//   return [h, s, v];
// };
