import { ComponentProps, useState, useEffect, useRef } from "react";
import { DonutChart, Legend } from "@tremor/react";

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
  const [popoverVisible, setPopoverVisible] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (chartRef.current && !chartRef.current.contains(event.target as Node)) {
      setPopoverVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const argments = formatArgments(props.chartData.data);
  return (
    <div className={`gap-4 flex flex-col ${props.className}`} ref={chartRef}>
      <DonutChart
        className="w-full h-64"
        data={argments.data}
        variant="donut"
        label={`${props.chartData.centralValue.toString()}`}
        valueFormatter={(val: number) => {
          return `${(val * 100).toFixed(1)}%`;
        }}
        onValueChange={(v) => {
          setPopoverVisible(true);
          console.log(v);
        }}
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
