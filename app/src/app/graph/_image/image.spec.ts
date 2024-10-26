import { describe, it, expect, beforeEach } from "vitest";
import { analyzeImage } from "./index";
import { ENV } from "@/constants";
import fs from "fs";
import { useTranslation } from "react-i18next";

describe("保存されているファイルを解析できる", () => {
  const { t } = useTranslation();
  const fileName: string = "image_spec.png";

  beforeEach(async () => {
    // サンプル画像の読み込み（/tmpに一時保存）
    const mockFile = await fs.readFileSync("testdata/mock.png");

    await fs.writeFileSync(
      `${ENV.BASE_OBJECT_PATH}/${ENV.TEMP_OBJECT_PATH}/${fileName}`,
      mockFile
    );
  });

  it("解析結果を受け取ることができる", async () => {
    // 画像解析実行
    const res = await analyzeImage(fileName);

    expect(res).toEqual({
      hue_chromatic: [0, 0, 0, 0.25, 0, 0, 0, 0.5, 0, 0, 0, 0.25],
      hue_gray: [0, 0, 0],
      saturation: [0, 0.25, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0],
      value: [0, 0, 0, 0, 0, 0, 0, 0.25, 0, 0, 0, 0.75],
      entropy: {
        hue_chromatic: 0.41841441847669475,
        hue_gray: 0,
        saturation: 0.22630030977895446,
        value: 0.22630030977895446,
      },
    });
  });

  it("一時保存されたファイルが削除されている", async () => {
    // 画像解析実行
    await analyzeImage(fileName);

    // ファイルが削除されているか確認
    expect(
      fs.existsSync(
        `${ENV.BASE_OBJECT_PATH}/${ENV.TEMP_OBJECT_PATH}/${fileName}`
      )
    ).toBe(false);
  });
});
