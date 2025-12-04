import { useEffect, useRef } from "react";

export const description = `
    功能: 最简单的坐标图
`;

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
      const [x, x2] = [2, width - 2];
      const [y, y2] = [2, height - 2];
      //
      renderArrow(ctx, x, y2, x2, y2, 2, -6);
      renderArrow(ctx, x, y2, x, y, 2, 6);
    })();
  }, []);

  return <canvas ref={ref} />;
};

const renderArrow = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  toX: number,
  toY: number,
  w: number,
  offset: number
) => {
  ctx.save();
  ctx.lineWidth = w;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(toX, toY);
  ctx.lineTo(toX + offset, toY + offset);
  ctx.stroke();
  ctx.restore();
};
