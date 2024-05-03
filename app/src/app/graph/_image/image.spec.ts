import { describe, it, expect, beforeEach } from "vitest";
import { ENV } from "@/constants";
import { GraphQLClient } from "graphql-request";
import { getSdk } from "@/gql/client";
import fs from "fs";

describe("保存されているファイルを解析できる", () => {
  let fileName: string;

  beforeEach(async () => {
    // サンプル画像の読み込み（/tmpに一時保存）
    const mockFile = await fs.readFileSync("testdata/mock.png");
    const BufferToFile = new File([mockFile], "mock.png", {
      type: "image/png",
    });
    const mockFormData = new FormData();
    mockFormData.append("image", BufferToFile);
    const response = await fetch(`${ENV.BASE_URL}/blob`, {
      method: "POST",
      body: mockFormData,
    });
    const data = await response.json();
    fileName = data.fileName;
  });

  it("解析結果を受け取ることができる", async () => {
    // 画像解析実行
    const graphQLClient = new GraphQLClient(`${ENV.BASE_URL}/graph`);
    const sampleClient = getSdk(graphQLClient);
    const res = await sampleClient.AnalyzeImage({
      fileName: fileName,
    });

    expect(res.data.analyzeImage).toEqual({
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
    const graphQLClient = new GraphQLClient(`${ENV.BASE_URL}/graph`);
    const sampleClient = getSdk(graphQLClient);
    await sampleClient.AnalyzeImage({
      fileName: fileName,
    });

    // ファイルが削除されているか確認
    expect(
      fs.existsSync(
        `${ENV.BASE_OBJECT_PATH}/${ENV.TEMP_OBJECT_PATH}/${fileName}`
      )
    ).toBe(false);
  });
});
