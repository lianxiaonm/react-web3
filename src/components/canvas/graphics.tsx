import { useEffect, useRef } from "react";

export const description = `
    功能: 图形绘制
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
      ctx.globalAlpha = 0.5;
      renderTriangle(ctx);
      renderSmile(ctx);
      renderRect(ctx);
    })();
  }, []);

  return <canvas ref={ref} />;
};

const renderRect = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = "black";
  ctx.fillText("矩形", 225, 40);
  ctx.beginPath();
  ctx.fillStyle = "blue";
  ctx.fillRect(225, 60, 80, 80);
  ctx.strokeStyle = "red";
  ctx.strokeRect(225, 60, 80, 80);
};

const renderSmile = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = "black";
  ctx.fillText("笑脸", 125, 40);
  ctx.beginPath();
  ctx.arc(150, 90, 30, 0, Math.PI * 2);
  ctx.moveTo(130, 90);
  ctx.arc(150, 90, 20, Math.PI, 0, true); // 口 (顺时针)
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(140, 80, 5, 0, Math.PI * 2); // 左眼
  ctx.moveTo(165, 80);
  ctx.arc(160, 80, 5, 0, Math.PI * 2); // 右眼
  ctx.fill();
};

const renderTriangle = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = "black";
  ctx.fillText("三角形", 20, 40);
  ctx.beginPath();
  ctx.moveTo(20, 60); // 起点
  ctx.lineTo(100, 60);
  ctx.lineTo(60, 120);
  ctx.closePath(); // 闭合路径
  ctx.fillStyle = "red";
  ctx.fill();
};
