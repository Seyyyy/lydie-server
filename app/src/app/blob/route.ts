import fs from "fs";
import crypto from "crypto";
import { ENV } from "@/constants";

export async function POST(request: Request) {
  const image = (await request.formData()).get("image") as Blob;

  if (image) {
    const buffer = Buffer.from(await image.arrayBuffer());

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
        fileName: fileName,
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
