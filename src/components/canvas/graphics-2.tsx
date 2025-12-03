import { useEffect, useRef } from "react";

export const description = `
    功能: 图形绘制2
`;

export const Canvas = () => {
  const ref = useRef<any>();

  useEffect(() => {
    const canvas = ref.current as HTMLCanvasElement;
    if (!canvas) return;

    canvas.width = 440;
    canvas.height = 300;

    const h = canvas.height;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    (function render() {
      ctx.font = "24px serif";
      quadraticCurveTo(ctx);
      bezierCurveTo(ctx);
    })();
  }, []);

  return <canvas ref={ref} />;
};

const quadraticCurveTo = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.translate(50, 0);
  ctx.moveTo(75, 25);
  ctx.quadraticCurveTo(25, 25, 25, 62.5);
  ctx.quadraticCurveTo(25, 100, 50, 100);
  ctx.quadraticCurveTo(50, 120, 30, 125);
  ctx.quadraticCurveTo(60, 120, 65, 100);
  ctx.quadraticCurveTo(125, 100, 125, 62.5);
  ctx.quadraticCurveTo(125, 25, 75, 25);
  ctx.stroke();

  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.moveTo(27, 27);
  ctx.arc(25, 25, 4, 0, Math.PI * 2);
  ctx.moveTo(27, 102);
  ctx.arc(25, 100, 4, 0, Math.PI * 2);
  ctx.moveTo(52, 122);
  ctx.arc(50, 120, 4, 0, Math.PI * 2);
  ctx.moveTo(62, 122);
  ctx.arc(60, 120, 4, 0, Math.PI * 2);
  ctx.moveTo(127, 102);
  ctx.arc(125, 100, 4, 0, Math.PI * 2);
  ctx.moveTo(127, 27);
  ctx.arc(125, 25, 4, 0, Math.PI * 2);
  ctx.fill();
};

const bezierCurveTo = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.translate(200, 0);
  ctx.moveTo(75, 40);
  ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
  ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
  ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
  ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
  ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
  ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
  ctx.fill();
};
