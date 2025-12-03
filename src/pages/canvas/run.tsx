import { useEffect, useRef } from "react";
import { atom, useAtom } from "jotai";
import Markdown from "react-markdown";

const runAtom = atom({
  description: `
    功能: 
    1. 绘制矩形
    2. 绘制矩形边框
  `,
  Canvas: () => {
    const ref = useRef<any>();

    useEffect(() => {
      const canvas = ref.current as HTMLCanvasElement;
      if (!canvas) return;

      canvas.width = 440;
      canvas.height = 300;

      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

      (function render() {
        // 绘制矩形
        ctx.fillStyle = "blue";
        ctx.fillRect(30, 20, 100, 100);
        //绘制边框矩形
        ctx.strokeStyle = "red";
        ctx.strokeRect(30, 20, 100, 100);
      })();
    }, []);

    return <canvas ref={ref} />;
  },
});

export const useRun = () => useAtom(runAtom);

export default function RunPage() {
  const [{ description, Canvas }] = useRun();
  return (
    <div className="h-full">
      <div className="bg-gray-200 with-markdown">
        <Markdown children={description} />
      </div>
      <Canvas />
    </div>
  );
}
