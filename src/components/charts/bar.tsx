import { useMemo } from "react";
import ReactECharts from "echarts-for-react";

export const title = "柱状图";

export const description = `
    描述：基础柱状图 + 堆叠柱状图
`;

export const Chart = () => {
  const options = useMemo(() => {
    return {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: { type: "value" },
      series: [
        {
          type: "bar",
          data: [23, 24, 18, 25, 27, 28, 25],
        },
      ],
    };
  }, []);

  const option1 = useMemo(() => {
    const arr = new Array(10).fill(0);
    return {
      xAxis: {
        type: "category",
        data: arr.map((_, index) => String.fromCharCode(index + 65)),
      },
      yAxis: { type: "value" },
      series: [
        {
          type: "bar",
          stack: "x",
          data: arr.map((_) => (Math.random() * 50) | 0),
        },
        {
          type: "bar",
          stack: "x",
          data: arr.map((_) => (Math.random() * 50) | 0),
        },
      ],
    };
  }, []);

  return [options, option1].map((option, key) => (
    <ReactECharts key={key} option={option} style={{ height: 300 }} />
  ));
};
