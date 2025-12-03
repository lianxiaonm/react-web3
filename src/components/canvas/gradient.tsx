import { useEffect, useRef } from "react";

export const description = `
    功能: 渐变
`;

export const Canvas = () => {
  const ref = useRef<any>();

  useEffect(() => {
    const canvas = ref.current as HTMLCanvasElement;
    if (!canvas) return;

    canvas.width = 440;
    canvas.height = 300;

    const w = canvas.width;
    const h = canvas.height;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    (function render() {
      ctx.font = "24px serif";
      ctx.beginPath();
      const linear = createLinearGradient(ctx, [50, 50], [100, 100]);
      ctx.fillStyle = linear;
      ctx.fillRect(50, 50, 100, 100);

      ctx.beginPath();
      const conic = createConicGradient(ctx, w - 100, 100);
      ctx.fillStyle = conic;
      ctx.arc(w - 100, 100, 50, 0, Math.PI * 2, true);
      ctx.fill();
    })();
  }, []);

  return <canvas ref={ref} />;
};

const createLinearGradient = (
  ctx: CanvasRenderingContext2D,
  lt: number[],
  size: number[]
): CanvasGradient => {
  const [x, y] = lt;
  const [w, h] = size;
  const linear = ctx.createLinearGradient(x, y, x + w, y + h);
  linear.addColorStop(0, "red");
  linear.addColorStop(0.5, "yellow");
  linear.addColorStop(1, "blue");
  return linear
};

const createConicGradient = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
): CanvasGradient => {
  const conic = ctx.createConicGradient(0, x, y);
  conic.addColorStop(0, "red");
  conic.addColorStop(0.25, "orange");
  conic.addColorStop(0.5, "yellow");
  conic.addColorStop(0.75, "green");
  conic.addColorStop(1, "blue");
  return conic;
};
