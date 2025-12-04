import { useEffect, useRef } from "react";
import { atom, useAtom } from "jotai";
import Markdown from "react-markdown";

const runAtom = atom({
  description: `
    功能: 
  `,
  Canvas: () => {
    const ref = useRef<any>();

    useEffect(() => {
      const canvas = ref.current as HTMLCanvasElement;
      if (!canvas) return;

      canvas.width = 440;
      canvas.height = 300;
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
