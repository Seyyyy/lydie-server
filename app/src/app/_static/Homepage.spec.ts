import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { formatAnalyzeImage } from "./HomePage";

describe("画像解析結果のUI", () => {
  it("APIから受け取ったデータを表示できるようにフォーマットできる", () => {
    const result = formatAnalyzeImage({
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

    expect(result).toEqual({
      hue: {
        chartData: {
          data: [
            { name: "red", value: 0, color: "red" },
            { name: "red-yellow", value: 0, color: "orange" },
            { name: "yellow", value: 0, color: "yellow" },
            { name: "yellow-green", value: 0.25, color: "lime" },
            { name: "green", value: 0, color: "green" },
            { name: "green-cyan", value: 0, color: "teal" },
            { name: "cyan", value: 0, color: "cyan" },
            { name: "cyan-blue", value: 0.5, color: "sky" },
            { name: "blue", value: 0, color: "blue" },
            { name: "blue-purple", value: 0, color: "indigo" },
            { name: "purple", value: 0, color: "purple" },
            { name: "purple-red", value: 0.25, color: "pink" },
          ],
          centralValue: 0.41841441847669475,
        },
      },
      saturation: {
        chartData: {
          data: [
            { name: "s0", value: 0, color: "white" },
            { name: "s1", value: 0.25, color: "red-50" },
            { name: "s2", value: 0, color: "red-100" },
            { name: "s3", value: 0, color: "red-200" },
            { name: "s4", value: 0.75, color: "red-300" },
            { name: "s5", value: 0, color: "red-400" },
            { name: "s6", value: 0, color: "red-500" },
            { name: "s7", value: 0, color: "red-600" },
            { name: "s8", value: 0, color: "red-700" },
            { name: "s9", value: 0, color: "red-800" },
            { name: "s10", value: 0, color: "red-900" },
            { name: "s11", value: 0, color: "red-950" },
          ],
          centralValue: 0.22630030977895446,
        },
      },
      value: {
        chartData: {
          data: [
            { name: "v0", value: 0, color: "white" },
            { name: "v1", value: 0, color: "red-50" },
            { name: "v2", value: 0, color: "red-100" },
            { name: "v3", value: 0, color: "red-200" },
            { name: "v4", value: 0, color: "red-300" },
            { name: "v5", value: 0, color: "red-400" },
            { name: "v6", value: 0, color: "red-500" },
            { name: "v7", value: 0.25, color: "red-600" },
            { name: "v8", value: 0, color: "red-700" },
            { name: "v9", value: 0, color: "red-800" },
            { name: "v10", value: 0, color: "red-900" },
            { name: "v11", value: 0.75, color: "red-950" },
          ],
          centralValue: 0.22630030977895446,
        },
      },
    });
  });

  describe("異常系", () => {
    it("分析結果が受け取れなかった場合は空のデータを返す", () => {
      const result = formatAnalyzeImage({
        hue_chromatic: null,
        hue_gray: null,
        saturation: null,
        value: null,
        entropy: null,
      });

      expect(result).toEqual({
        hue: {
          chartData: {
            data: [
              {
                name: "no-data",
                value: 1,
                color: "gray",
              },
            ],
            centralValue: 0,
          },
        },
        saturation: {
          chartData: {
            data: [
              {
                name: "no-data",
                value: 1,
                color: "gray",
              },
            ],
            centralValue: 0,
          },
        },
        value: {
          chartData: {
            data: [
              {
                name: "no-data",
                value: 1,
                color: "gray",
              },
            ],
            centralValue: 0,
          },
        },
      });
    });

    it("分析結果が意図した形式ではない場合は空のデータを返す", () => {
      const result = formatAnalyzeImage({
        hue_chromatic: [0, 0.1, 0.2],
        hue_gray: [0, 0.1, 0.2],
        saturation: [0, 0.1, 0.2],
        value: [0, 0.1, 0.2],
        entropy: {
          hue_chromatic: null,
          hue_gray: null,
          saturation: null,
          value: null,
        },
      });

      expect(result).toEqual({
        hue: {
          chartData: {
            data: [
              {
                name: "no-data",
                value: 1,
                color: "gray",
              },
            ],
            centralValue: 0,
          },
        },
        saturation: {
          chartData: {
            data: [
              {
                name: "no-data",
                value: 1,
                color: "gray",
              },
            ],
            centralValue: 0,
          },
        },
        value: {
          chartData: {
            data: [
              {
                name: "no-data",
                value: 1,
                color: "gray",
              },
            ],
            centralValue: 0,
          },
        },
      });
    });
  });
});
