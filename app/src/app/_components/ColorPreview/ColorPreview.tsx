import { ComponentProps } from "react";
import { DonutChart } from "@tremor/react";

type Data = {
  name: string;
  value: number;
  color: string;
};

type ChartData = {
  data: Data[];
  centralValue: number; // 代表値
};

export type Props = {
  chartData: ChartData;
} & ComponentProps<"div">;

export const formatArgments = (
  data: Data[]
): {
  data: { name: string; value: number }[];
  colors: string[];
  categories: string[];
} => {
  const colors = data.map((d) => d.color);
  const categories = data.map((d) => d.name);
  return {
    data: data.map((d) => ({ name: d.name, value: d.value })),
    colors,
    categories,
  };
};

export const ColorPreview = (props: Props) => {
  const argments = formatArgments(props.chartData.data);
  return (
    <div className={`gap-4 flex flex-col ${props.className}`}>
      <DonutChart
        className="w-full h-64"
        data={argments.data}
        variant="donut"
        label={`${(props.chartData.centralValue * 100).toFixed(1)}%`}
        valueFormatter={(val: number) => {
          return `${(val * 100).toFixed(1)}%`;
        }}
        colors={argments.colors}
        showAnimation
      />
    </div>
  );
};
