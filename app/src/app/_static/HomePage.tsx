"use client";

import { useState } from "react";
import { Easel } from "@/app/_components/Easel/Easel";
import {
  ColorPreview,
  Props as ColorPreviewProps,
} from "@/app/_components/ColorPreview/ColorPreview";
import { Toggle } from "@/app/_components/Toggle/Toggle"
// import { Select } from "@/app/_components/Select/Select";
import { Button } from "@/app/_components/Button/Button";
import { UseImage } from "@/app/_models/image/useImage";
import { UseStore } from "@/app/_models/store/useStore";
import { Parameter } from "@/gql/client";

const initialColorPreview = {
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
};

/**
 * @param analyzeResult 分析結果
 * @returns 分析結果をグラフ表示用にフォーマットしたオブジェクト
 */
export const formatAnalyzeImage = (
  analyzeResult: Parameter
): { [key: string]: Pick<ColorPreviewProps, "chartData"> } => {
  // 分析結果が存在しない場合はデータ無しとしてグレー表示
  if (
    !analyzeResult.hue_chromatic ||
    !analyzeResult.saturation ||
    !analyzeResult.value ||
    !analyzeResult.entropy
  ) {
    return initialColorPreview;
  }

  // 分析結果が期待する形式でない場合はデータ無しとしてグレー表示
  if (
    analyzeResult.hue_chromatic.length !== 12 ||
    analyzeResult.saturation.length !== 12 ||
    analyzeResult.value.length !== 12 ||
    !analyzeResult.entropy.hue_chromatic ||
    !analyzeResult.entropy.saturation ||
    !analyzeResult.entropy.value
  ) {
    return initialColorPreview;
  }

  return {
    hue: {
      chartData: {
        data: [
          {
            name: "red",
            value: analyzeResult.hue_chromatic[0] || 0,
            color: "red",
          },
          {
            name: "red-yellow",
            value: analyzeResult.hue_chromatic[1] || 0,
            color: "orange",
          },
          {
            name: "yellow",
            value: analyzeResult.hue_chromatic[2] || 0,
            color: "yellow",
          },
          {
            name: "yellow-green",
            value: analyzeResult.hue_chromatic[3] || 0,
            color: "lime",
          },
          {
            name: "green",
            value: analyzeResult.hue_chromatic[4] || 0,
            color: "green",
          },
          {
            name: "green-cyan",
            value: analyzeResult.hue_chromatic[5] || 0,
            color: "teal",
          },
          {
            name: "cyan",
            value: analyzeResult.hue_chromatic[6] || 0,
            color: "cyan",
          },
          {
            name: "cyan-blue",
            value: analyzeResult.hue_chromatic[7] || 0,
            color: "sky",
          },
          {
            name: "blue",
            value: analyzeResult.hue_chromatic[8] || 0,
            color: "blue",
          },
          {
            name: "blue-purple",
            value: analyzeResult.hue_chromatic[9] || 0,
            color: "indigo",
          },
          {
            name: "purple",
            value: analyzeResult.hue_chromatic[10] || 0,
            color: "purple",
          },
          {
            name: "purple-red",
            value: analyzeResult.hue_chromatic[11] || 0,
            color: "pink",
          },
        ],
        centralValue: analyzeResult.entropy.hue_chromatic || 0,
      },
    },
    saturation: {
      chartData: {
        data: [
          {
            name: "s0",
            value: analyzeResult.saturation[0] || 0,
            color: "slate-50",
          },
          {
            name: "s1",
            value: analyzeResult.saturation[1] || 0,
            color: "red-50",
          },
          {
            name: "s2",
            value: analyzeResult.saturation[2] || 0,
            color: "red-100",
          },
          {
            name: "s3",
            value: analyzeResult.saturation[3] || 0,
            color: "red-200",
          },
          {
            name: "s4",
            value: analyzeResult.saturation[4] || 0,
            color: "red-300",
          },
          {
            name: "s5",
            value: analyzeResult.saturation[5] || 0,
            color: "red-400",
          },
          {
            name: "s6",
            value: analyzeResult.saturation[6] || 0,
            color: "red-500",
          },
          {
            name: "s7",
            value: analyzeResult.saturation[7] || 0,
            color: "red-600",
          },
          {
            name: "s8",
            value: analyzeResult.saturation[8] || 0,
            color: "red-700",
          },
          {
            name: "s9",
            value: analyzeResult.saturation[9] || 0,
            color: "red-800",
          },
          {
            name: "s10",
            value: analyzeResult.saturation[10] || 0,
            color: "red-900",
          },
          {
            name: "s11",
            value: analyzeResult.saturation[11] || 0,
            color: "red-950",
          },
        ],
        centralValue: analyzeResult.entropy.saturation || 0,
      },
    },
    value: {
      chartData: {
        data: [
          { name: "v0", value: analyzeResult.value[0] || 0, color: "slate-50" },
          { name: "v1", value: analyzeResult.value[1] || 0, color: "red-50" },
          { name: "v2", value: analyzeResult.value[2] || 0, color: "red-100" },
          { name: "v3", value: analyzeResult.value[3] || 0, color: "red-200" },
          { name: "v4", value: analyzeResult.value[4] || 0, color: "red-300" },
          { name: "v5", value: analyzeResult.value[5] || 0, color: "red-400" },
          { name: "v6", value: analyzeResult.value[6] || 0, color: "red-500" },
          { name: "v7", value: analyzeResult.value[7] || 0, color: "red-600" },
          { name: "v8", value: analyzeResult.value[8] || 0, color: "red-700" },
          { name: "v9", value: analyzeResult.value[9] || 0, color: "red-800" },
          {
            name: "v10",
            value: analyzeResult.value[10] || 0,
            color: "red-900",
          },
          {
            name: "v11",
            value: analyzeResult.value[11] || 0,
            color: "red-950",
          },
        ],
        centralValue: analyzeResult.entropy.value || 0,
      },
    },
  };
};

const Viewer = (props: {
  colorPreview: { [key: string]: Pick<ColorPreviewProps, "chartData"> };
}) => {
  const [selected, setSelected] = useState<"Hue" | "Saturation" | "Value">(
    "Hue"
  );

  const onClick = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: "Hue" | "Saturation" | "Value") => {
    setSelected(value)
  }

  return (
    <>
      <div className="w-full h-[8%] flex items-center">
        <div className="mx-auto">
          <Toggle value={selected} list={[{
            value: "Hue",
            label: "H"
          },
          {
            value: "Saturation",
            label: "S"
          },
          {
            value: "Value",
            label: "V"
          }]} onClick={onClick} />
        </div>
      </div>
      <div className="py-4 px-10 flex justify-center">
        <ColorPreview
          className=""
          chartData={
            selected === "Hue"
              ? props.colorPreview.hue.chartData
              : selected === "Saturation"
                ? props.colorPreview.saturation.chartData
                : props.colorPreview.value.chartData
          }
        />
      </div>
    </>
  );
};

/**
 * @param useImage カスタムフック
 */
export const HomePage = (props: { useImage: UseImage, useStore: UseStore }) => {
  const [file, setFile] = useState<File | null>(null);
  const [colorPreview, setColorPreview] = useState<{
    [key: string]: Pick<ColorPreviewProps, "chartData">;
  }>(initialColorPreview);
  const image = props.useImage();
  const store = props.useStore();

  const handleClickCreateStore = async () => {
    if (file === null || image === null) {
      console.error("file is null")
      return;
    }

    createStore(file);
    return;
  }

  const createStore = async (file: File) => {
    await store.mutate.createStore(file.name, file);
    return;
  }

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);

      analyzeImage(e.target.files[0]);
    }
  };

  const analyzeImage = async (file: File) => {
    if (file === null || image === null) {
      setColorPreview(initialColorPreview);
      return;
    }

    // 画像解析処理
    const result = await image.mutate.analyzeImage(file as File);

    if (!result) {
      setColorPreview(initialColorPreview);
      return;
    }

    const formatData = formatAnalyzeImage({
      hue_chromatic: result?.hue_chromatic,
      hue_gray: result?.hue_gray,
      saturation: result?.saturation,
      value: result?.value,
      entropy: result?.entropy,
    });

    setColorPreview(formatData);
    return;
  };

  return (
    <>
      <div className={`w-full h-[70vh]`}>
        <Easel
          className="w-full h-full"
          onChange={handleChangeImage}
          src={file ? URL.createObjectURL(file) : ""}
          aria-label="Upload image"
        />
      </div>
      <div className="mt-[-100px] bg-gradient-to-b from-light-base-color/0 from-[0px] via-light-base-color/80 via-[34px] to-light-base-color to-[74px] relative w-full">
        <div className="mt-[24px] flex flex-col justify-center">
          <Viewer colorPreview={colorPreview} />
        </div>
      </div>
      <Button onClick={handleClickCreateStore} disabled={!file}>Create Store</Button>
    </>
  );
};
