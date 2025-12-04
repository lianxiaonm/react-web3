import { useCallback, useEffect, useRef, useState } from "react";
import { ColorPicker } from "antd";
import { useDebounce } from "ahooks";

export const description = `
    功能: 图像填充
`;

export const Canvas = () => {
  const ref = useRef<any>();
  const [value, setHex] = useState<string>("#FFFFFF");

  const hex = useDebounce(value, { wait: 500 });

  const canvasClick = useCallback(
    (event: any) => {
      const { clientX, clientY, target: canvas } = event;
      const { top, left, width, height } = canvas.getBoundingClientRect();
      const offsetX = Math.floor(clientX - left);
      const offsetY = Math.floor(clientY - top);

      const ctx = canvas.getContext("2d", {
        willReadFrequently: true,
      }) as CanvasRenderingContext2D;
      const imageData = ctx.getImageData(0, 0, width, height);

      const targetColors = [
        parseInt(hex.slice(1, 3), 16),
        parseInt(hex.slice(3, 5), 16),
        parseInt(hex.slice(5, 7), 16),
        parseInt(hex.slice(7) || "FF", 16),
      ];
      const index = (offsetY * width + offsetX) * 4;
      const pointColors = imageData.data.slice(index, index + 4);

      function diff(
        c1: Uint8ClampedArray<ArrayBuffer>,
        c2: Uint8ClampedArray<ArrayBuffer> | any[]
      ) {
        return (
          Math.abs(c1[0] - c2[0]) +
          Math.abs(c1[1] - c2[1]) +
          Math.abs(c1[2] - c2[2]) +
          Math.abs(c1[3] - c2[3])
        );
      }

      const stack = [[offsetX, offsetY]];
      while (stack.length > 0) {
        const [x, y] = stack.pop() as number[];
        const i = (y * width + x) * 4;
        const curr = imageData.data.slice(i, i + 4);
        if (diff(curr, pointColors) > 50) continue;
        if (diff(curr, targetColors) === 0) continue;
        imageData.data.set(targetColors, i);
        x > 0 && stack.push([x - 1, y]);
        y > 0 && stack.push([x, y - 1]);
        x < width - 1 && stack.push([x + 1, y]);
        y < height - 1 && stack.push([x, y + 1]);
      }
      ctx.putImageData(imageData, 0, 0);
    },
    [hex]
  );

  useEffect(() => {
    const canvas = ref.current as HTMLCanvasElement;
    if (!canvas) return;

    canvas.width = 440;
    canvas.height = 300;

    const w = canvas.width;
    const h = canvas.height;

    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    }) as CanvasRenderingContext2D;
    (function render() {
      ctx.font = "24px serif";
      const imge = document.createElement("img");
      imge.onload = () => {
        ctx.drawImage(imge, 0, 0, w, h);
      };
      imge.src = "/yay.jpg";
    })();
  }, []);

  return (
    <>
      <div className="flex py-[4px] justify-center">
        <ColorPicker
          showText
          defaultValue={hex}
          onChange={(val) => setHex(val.toHexString())}
        />
      </div>
      <canvas ref={ref} onClick={canvasClick} className="shadow" />
    </>
  );
};
