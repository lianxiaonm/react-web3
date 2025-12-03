import { history } from "umi";
import { useCallback } from "react";
import { useRun } from "./run";

const req = (require as any).context(
  "../../components/canvas",
  false,
  /\.tsx$/i
);

const demos: Record<string, any> = {};
req.keys().forEach((key: string) => {
  const componentName = key.replace("./", "").replace(".tsx", "");
  if (/\//.test(componentName)) return;
  demos[componentName] = req(key);
});

export default function ListPage() {
  const [_, setRun] = useRun();
  const click = useCallback((key: string) => {
    const { description, Canvas } = demos[key];
    setRun({ description, Canvas });
    setTimeout(() => history.push("canvas/run"), 0);
  }, []);

  return (
    <ul className="h-full flex flex-col">
      {Object.keys(demos).map((key) => (
        <li
          key={key}
          onClick={() => click(key)}
          children={demos[key].title || key}
          className="px-[24px] py-[16px] cursor-pointer border-b last-of-type:border-none"
        />
      ))}
    </ul>
  );
}
