import { test, expect } from "@playwright/test";
import path from "path";

// テストベース
// https://github.com/Seyyyy/lydie-server/wiki/%E3%83%A6%E3%83%BC%E3%82%B9%E3%82%B1%E3%83%BC%E3%82%B9%E5%9B%B3#%E7%94%BB%E5%83%8F%E6%A4%9C%E8%A8%BC
test.describe("画像分析機能の検証", () => {
  test("HSVのEntropyが出力されている", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    // 上から1番目のinput要素を取得
    // https://playwright.dev/docs/input#upload-files
    const inputElement = await page.getByLabel("Upload image");
    inputElement.setInputFiles(path.join(__dirname, "../../testdata/mock.png"));

    // Hueの分析結果が出力されることを確認
    await page.getByText("0.41841441847669475").waitFor(); // entropyが出力されるまで待機
    let entropy = await page.getByText("0.41841441847669475").count();
    expect(entropy).toBe(1);

    // 表示するデータ項目をcomboboxで選択
    await page.getByRole("combobox").selectOption({ label: "Saturation" });

    // Saturationの分析結果が出力されることを確認
    await page.getByText("0.22630030977895446").waitFor(); // entropyが出力されるまで待機
    entropy = await page.getByText("0.22630030977895446").count();
    expect(entropy).toBe(1);

    // 表示するデータ項目をcomboboxで選択
    await page.getByRole("combobox").selectOption({ label: "Value" });

    // Valueの分析結果が出力されることを確認
    await page.getByText("0.22630030977895446").waitFor(); // entropyが出力されるまで待機
    entropy = await page.getByText("0.22630030977895446").count();
    expect(entropy).toBe(1);
  });
});
