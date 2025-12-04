import { useMemo } from "react";
import ReactECharts from "echarts-for-react";

export const title = "折线图";

export const description = `
    描述：基础折线图
`;

export const Chart = () => {
  const options = useMemo(() => {
    const arr = new Array(12).fill(0);
    return {
      xAxis: {
        type: "category",
        data: arr.map((_, index) => String.fromCharCode(index + 65)),
      },
      yAxis: { type: "value" },
      series: [
        {
          type: "line",
          data: arr.map((_) => (Math.random() * 100) | 0),
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
          type: "line",
          stack: "x",
          data: arr.map((_) => (Math.random() * 100) | 0),
        },
        {
          type: "line",
          stack: "x",
          data: arr.map((_) => (Math.random() * 100) | 0),
        },
      ],
    };
  }, []);

  return [options, option1].map((option, key) => (
    <ReactECharts key={key} option={option} style={{ height: 300 }} />
  ));
};
