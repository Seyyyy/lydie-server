import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { POST } from "./route";
import { ENV } from "@/constants";
import fs from "fs";

describe("ファイルシステムにファイルが保存されている", () => {
  let request: Request;

  beforeEach(async () => {
    // requestインスタンスの作成
    const mockFile = await fs.readFileSync("testdata/mock.png");
    const BufferToFile = new File([mockFile], "mock.png", {
      type: "image/png",
    });
    const mockFormData = new FormData();
    mockFormData.append("image", BufferToFile);
    request = new Request(`${ENV.BASE_URL}/blob`, {
      method: "POST",
      body: mockFormData,
    });
  });

  afterEach(async () => {
    // テスト後にファイルを削除
    await fs.unlinkSync(
      `${ENV.BASE_OBJECT_PATH}/${ENV.TEMP_OBJECT_PATH}/test.png`
    );
  });

  it("ファイルが保存されている", async () => {
    await POST(request);

    expect(
      fs.existsSync(`${ENV.BASE_OBJECT_PATH}/${ENV.TEMP_OBJECT_PATH}/test.png`)
    ).toBe(true);
  });

  it("保存先のファイルパスが返却される(将来的にファイルパスはハッシュ化して返却したい)", async () => {
    const res = await POST(request);
    const json = await res.json();

    expect(json.filePath).toContain(`/tmp/test.png`);
  });
});

describe("保存可能なファイルの検証", () => {
  it("png, jpeg, jpg以外はエラー", async () => {
    const BufferToFile = new File([""], "mock.txt", {
      type: "text/plain",
    });
    const mockFormData = new FormData();
    mockFormData.append("image", BufferToFile);
    const request = new Request(`${ENV.BASE_URL}/blob`, {
      method: "POST",
      body: mockFormData,
    });

    const res = await POST(request);
    const json = await res.json();

    expect(json.message).toBe("Invalid file type");
  });
});
