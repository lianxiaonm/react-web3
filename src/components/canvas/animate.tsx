import { useEffect, useRef } from "react";

export const description = `
    功能: 动画
    1. 一个50*50的方块从0-10的位置从左往右移动
`;

export const Canvas = () => {
  const ref = useRef<any>();

  useEffect(() => {
    const canvas = ref.current as HTMLCanvasElement;
    if (!canvas) return;

    canvas.width = 440;
    canvas.height = 300;

    let x = 0;
    let stepX = 2;
    let handle: any = null;
    const width = canvas.width;
    const height = canvas.height;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    (function render() {
      ctx.clearRect(0, 0, width, height);
      // 绘制矩形
      ctx.fillStyle = "blue";
      ctx.fillRect(x, 20, 50, 50); // 绘制方块
      if (x >= width - 50) stepX = -2;
      else if (x <= 0) stepX = 2;
      x += stepX; // 更新位置
      handle = requestAnimationFrame(render);
    })();
    return () => handle && cancelAnimationFrame(handle);
  }, []);

  return <canvas ref={ref} />;
};
