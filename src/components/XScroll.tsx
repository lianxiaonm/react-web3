import { useRef, ReactNode, useMemo } from "react";
import { throttle } from "lodash-es";

export default function XScroll({ children }: { children: ReactNode }) {
  const barRef = useRef<any>(null);

  const scrollX = useMemo(() => {
    return throttle((event) => {
      const { target } = event;
      const { current } = barRef;
      if (current instanceof HTMLElement) {
        const { scrollLeft, scrollWidth } = target;
        const { width } = target.getBoundingClientRect();
        const scrollPencent = Math.ceil(
          (scrollLeft * 100) / (scrollWidth - width)
        );
        const [inner] = current.children;
        const { width: barWidth } = current.getBoundingClientRect();
        const { width: innerWidth } = inner.getBoundingClientRect();
        const x = ((barWidth - innerWidth) * scrollPencent) / 100;
        inner.setAttribute("style", `transform: translate(${x}px, 0px)`);
      }
    }, 100 / 3);
  }, []);

  return (
    <div className="flex flex-col items-center gap-[12px]">
      <div
        onScroll={scrollX}
        className="no-scroll flex gap-[16px] overflow-auto w-full"
        children={children}
      />
      <div className="w-[50px] h-[4px] rounded-full bg-gray-400" ref={barRef}>
        <div className="h-full w-[14px] bg-black rounded-full" />
      </div>
    </div>
  );
}
