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
    <div className={`w-64 h-64 gap-4 relative ${props.className}`}>
      <div className="absolute top-[49%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <p className="text-light-main-color/50 text-xs font-bold text-center">entropy</p>
        <p className="text-light-main-color text-4xl font-bold text-center">{`${(props.chartData.centralValue * 100).toFixed(1)}%`}</p>
      </div>
      <DonutChart
        className="w-64 h-64 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        data={argments.data}
        variant="donut"
        showLabel={false}
        valueFormatter={(val: number) => {
          return `${(val * 100).toFixed(1)}%`;
        }}
        colors={argments.colors}
        showAnimation
      />
    </div>
  );
};
