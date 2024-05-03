"use client";

import { useState } from "react";
import { Easel } from "@/app/_components/Easel/Easel";
import {
  ColorPreview,
  Props as ColorPreviewProps,
} from "@/app/_components/ColorPreview/ColorPreview";
import { Select } from "@/app/_components/Select/Select";
import { Button } from "@/app/_components/Button/Button";
import { useImage } from "@/app/_models/image/useImage";

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

export const HomePage = () => {
  const [selected, setSelected] = useState<"Hue" | "Saturation" | "Value">(
    "Hue"
  );
  const [file, setFile] = useState<File | null>(null);
  const [colorPreview, setColorPreview] = useState<{
    [key: string]: Pick<ColorPreviewProps, "chartData">;
  }>(initialColorPreview);
  const image = useImage();

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);

      analyzeImage(e.target.files[0]);
    }
  };

  const analyzeImage = async (file: File) => {
    if (file === null || image === null || image.loading || image.error) {
      setColorPreview(initialColorPreview);
      return;
    }

    // 画像解析処理
    const result = await image.mutate.analyzeImage(file as File);

    setColorPreview({
      hue: {
        chartData: {
          data: [
            { name: "red", value: 0.076, color: "red" },
            { name: "red-yellow", value: 0.005, color: "orange" },
            { name: "yellow", value: 0.002, color: "yellow" },
            { name: "yellow-green", value: 0.001, color: "lime" },
            { name: "green", value: 0.0, color: "green" },
            { name: "green-cyan", value: 0.003, color: "teal" },
            { name: "cyan", value: 0.385, color: "cyan" },
            { name: "cyan-blue", value: 0.368, color: "sky" },
            { name: "blue", value: 0.084, color: "blue" },
            { name: "blue-purple", value: 0.015, color: "indigo" },
            { name: "purple", value: 0.017, color: "purple" },
            { name: "purple-red", value: 0.045, color: "pink" },
          ],
          centralValue: 0.1,
        },
      },
      saturation: {
        chartData: {
          data: [
            { name: "red", value: 0.076, color: "red" },
            { name: "black", value: 0.005, color: "black" },
          ],
          centralValue: 0.2,
        },
      },
      value: {
        chartData: {
          data: [
            { name: "red", value: 0.076, color: "red" },
            { name: "white", value: 0.005, color: "white" },
          ],
          centralValue: 0.3,
        },
      },
    });
    return;
  };

  return (
    <div className="w-full h-[800px] bg-light-base-color">
      <div className="w-full h-[6%] px-3 flex items-center justify-center">
        <p className="text-light-main-color text-size-paragraph font-bold">
          Lydie
        </p>
      </div>
      <Easel
        className="w-full h-[30%]"
        onChange={handleChangeImage}
        src={file ? URL.createObjectURL(file) : ""}
      />
      <div className="w-full h-[8%] flex items-center">
        <div className="w-full h-9 flex items-center px-4">
          <div className="w-[50%] h-9 flex justify-start items-center">
            <Button className="h-9">Save</Button>
          </div>
          <div className="w-[50%] h-9 flex justify-end items-center">
            <Select
              options={["Hue", "Saturation", "Value"]}
              value={selected}
              className="w-full h-full"
              onChange={(e) => {
                setSelected(e.target.value as "Hue" | "Saturation" | "Value");
              }}
            />
          </div>
        </div>
      </div>
      <div className="w-full h-[56%] py-4 px-10 flex justify-start flex-col">
        <ColorPreview
          className="w-full h-full"
          chartData={
            selected === "Hue"
              ? colorPreview.hue.chartData
              : selected === "Saturation"
                ? colorPreview.saturation.chartData
                : colorPreview.value.chartData
          }
        />
      </div>
    </div>
  );
};
