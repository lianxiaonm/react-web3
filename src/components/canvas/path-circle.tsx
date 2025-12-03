import { useEffect, useRef } from "react";

export const description = `
    功能: 路径与图形绘制
`;

export const drawer = (canvas: HTMLCanvasElement) => {
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  (function render() {
    ctx.beginPath();
    ctx.moveTo(width / 2, 0); // 起点
    ctx.lineTo(0, height / 2);
    ctx.lineTo(width / 2, height);
    ctx.lineTo(width, height / 2);
    ctx.closePath(); // 闭合路径

    ctx.fillStyle = "red";
    ctx.fill();
  })();
  return {
    cancel: () => void 0,
  };
};

export const Canvas = () => {
  const ref = useRef<any>();

  useEffect(() => {
    const canvas = ref.current as HTMLCanvasElement;
    if (!canvas) return;

    canvas.width = 440;
    canvas.height = 300;

    const width = canvas.width;
    const height = canvas.height;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    (function render() {
      ctx.beginPath();
      ctx.moveTo(width / 2, 0); // 起点
      ctx.lineTo(0, height / 2);
      ctx.lineTo(width / 2, height);
      ctx.lineTo(width, height / 2);
      ctx.closePath(); // 闭合路径

      ctx.fillStyle = "red";
      ctx.fill();
    })();
  }, []);

  return <canvas ref={ref} />;
};
