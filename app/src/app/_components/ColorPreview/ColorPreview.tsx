import { ComponentProps } from "react";
import { DonutChart, Legend } from "@tremor/react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const argments = formatArgments(props.chartData.data);
  return (
    <div className={`gap-4 flex flex-col ${props.className}`}>
      <DonutChart
        className="w-full h-64"
        data={argments.data}
        variant="donut"
        label={`${props.chartData.centralValue.toString()}`}
        valueFormatter={(val: number) => {
          return `${(val * 100).toFixed(1)}%`;
        }}
        // onValueChange={(v) => console.log(v)} // このプロパティを有効にすると、outside clickでpopoverが閉じなくなる。
        colors={argments.colors}
        showAnimation
      />
      <Legend
        categories={argments.categories}
        colors={argments.colors}
        className="w-full overflow-auto"
      />
    </div>
  );
};
